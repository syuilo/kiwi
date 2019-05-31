import * as fs from 'fs';
import { IEndpointMeta } from './endpoints';
import { ApiError } from './error';
import { SchemaType } from '../../misc/schema';
import { User } from '../../models/entities/user';

type Params<T extends IEndpointMeta> = {
	[P in keyof T['params']]: NonNullable<T['params']>[P]['transform'] extends Function
		? ReturnType<NonNullable<T['params']>[P]['transform']>
		: ReturnType<NonNullable<T['params']>[P]['validator']['get']>[0];
};

export type Response = Record<string, any> | void;

type executor<T extends IEndpointMeta> =
	(params: Params<T>, user: User, file?: any, cleanup?: Function) =>
		Promise<T['res'] extends undefined ? Response : SchemaType<NonNullable<T['res']>>>;

export default function <T extends IEndpointMeta>(meta: T, cb: executor<T>)
		: (params: any, user: User, file?: any) => Promise<any> {
	return (params: any, user: User, file?: any) => {
		function cleanup() {
			fs.unlink(file.path, () => {});
		}

		if (meta.requireFile && file == null) return Promise.reject(new ApiError({
			message: 'File required.',
			code: 'FILE_REQUIRED',
			id: '17986b84-60ad-4c7c-892e-7285157e9e09',
		}));

		const [ps, pserr] = getParams(meta, params);
		if (pserr) {
			if (file) cleanup();
			return Promise.reject(pserr);
		}

		return cb(ps, user, file, cleanup);
	};
}

function getParams<T extends IEndpointMeta>(defs: T, params: any): [Params<T>, ApiError | null] {
	if (defs.params == null) return [params, null];

	const x: any = {};
	let err: ApiError | null = null;
	Object.entries(defs.params).some(([k, def]) => {
		const [v, e] = def.validator.get(params[k]);
		if (e) {
			err = new ApiError({
				message: 'Invalid param.',
				code: 'INVALID_PARAM',
				id: '9da7f644-d78d-4402-a433-eb4a34f92fc4',
			}, {
				param: k,
				reason: e.message
			});
			return true;
		} else {
			if (v === undefined && def.hasOwnProperty('default')) {
				x[k] = def.default;
			} else {
				x[k] = v;
			}
			if (def.transform) x[k] = def.transform(x[k]);
			return false;
		}
	});
	return [x, err];
}
