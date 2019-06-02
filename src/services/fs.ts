import * as fs from 'fs';
import * as Path from 'path';
import * as crypto from 'crypto';
import * as fileType from 'file-type';
import isSvg from 'is-svg';
import { ulid } from 'ulid';
import { Kwr } from './repository';
import { User } from '../models/entities/user';
import { Files } from '../models';
import { File } from '../models/entities/file';

/**
 * FileSystem
 */
export class Kwfs {
	private static readonly BASE = Path.resolve(`${__dirname}/../../files`);

	public static async create(user: User | null, path: string, name: string | null = null, comment: string | null = null) {
		// Calc md5 hash
		const calcHash = new Promise<string>((res, rej) => {
			const readable = fs.createReadStream(path);
			const hash = crypto.createHash('md5');
			const chunks: Buffer[] = [];
			readable
				.on('error', rej)
				.pipe(hash)
				.on('error', rej)
				.on('data', chunk => chunks.push(chunk))
				.on('end', () => {
					const buffer = Buffer.concat(chunks);
					res(buffer.toString('hex'));
				});
		});

		// Get file size
		const getFileSize = new Promise<number>((res, rej) => {
			fs.stat(path, (err, stats) => {
				if (err) return rej(err);
				res(stats.size);
			});
		});

		const [hash, [mime, ext], size] = await Promise.all([calcHash, detectMine(path), getFileSize]);

		//logger.info(`hash: ${hash}, mime: ${mime}, ext: ${ext}, size: ${size}`);

		// detect name
		const detectedName = name || (ext ? `untitled.${ext}` : 'untitled');

		const key = ulid().toLowerCase();

		fs.mkdirSync(Kwfs.BASE, { recursive: true });
		fs.copyFileSync(path, `${Kwfs.BASE}/${key}`);

		// todo: transaction

		const file = await Files.save(new File({
			createdAt: new Date(),
			updatedAt: new Date(),
			name: detectedName,
			file: key,
			md5: hash,
			type: mime,
			size: size,
		}));

		await Kwr.commit(user, 'Initial commit', 'file', {
			name: detectedName,
			file: key,
			md5: hash,
			type: mime,
			size: size,
		});

		return file;
	}
}

async function detectMine(path: string) {
	return new Promise<[string, string | null]>((res, rej) => {
		const readable = fs.createReadStream(path);
		readable
			.on('error', rej)
			.once('data', (buffer: Buffer) => {
				readable.destroy();
				const type = fileType(buffer);
				if (type) {
					if (type.mime == 'application/xml' && checkSvg(path)) {
						res(['image/svg+xml', 'svg']);
					} else {
						res([type.mime, type.ext]);
					}
				} else if (checkSvg(path)) {
					res(['image/svg+xml', 'svg']);
				} else {
					// 種類が同定できなかったら application/octet-stream にする
					res(['application/octet-stream', null]);
				}
			})
			.on('end', () => {
				// maybe 0 bytes
				res(['application/octet-stream', null]);
			});
	});
}

function checkSvg(path: string) {
	try {
		const size = fs.statSync(path).size;
		if (size > 1 * 1024 * 1024) return false;
		return isSvg(fs.readFileSync(path));
	} catch {
		return false;
	}
}
