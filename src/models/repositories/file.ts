import { EntityRepository, Repository } from 'typeorm';
import { File } from '../entities/file';
import { ensure } from '../../prelude/ensure';
import { awaitAll } from '../../prelude/await-all';

export type PackedFile = any;

@EntityRepository(File)
export class FileRepository extends Repository<File> {
	public async pack(
		src: File['id'] | File,
	): Promise<PackedFile> {
		const file = typeof src === 'object' ? src : await this.findOne(src).then(ensure);

		const packed = {
			id: file.id,
			name: file.name,
		};

		return await awaitAll(packed);
	}

	public packMany(
		files: (File['id'] | File)[],
	) {
		return Promise.all(files.map(u => this.pack(u)));
	}
}
