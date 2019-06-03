import { Context } from 'cafy';
import * as path from 'path';
import * as glob from 'glob';
import { Schema } from '../../misc/schema';

export type Param = {
	validator: Context<any>;
	transform?: any;
	default?: any;
	deprecated?: boolean;
	desc?: { [key: string]: string };
	ref?: string;
};

export interface IEndpointMeta {
	params?: {
		[key: string]: Param;
	};

	errors?: {
		[key: string]: {
			message: string;
			code: string;
			id: string;
		};
	};

	res?: Schema;

	/**
	 * このエンドポイントにリクエストするのにユーザー情報が必須か否か
	 * 省略した場合は false として解釈されます。
	 */
	requireCredential?: boolean;

	requireRecaptcha?: boolean;

	/**
	 * ファイルの添付を必要とするか否か
	 * 省略した場合は false として解釈されます。
	 */
	requireFile?: boolean;

	permission?: string;
}

export interface IEndpoint {
	name: string;
	exec: any;
	meta: IEndpointMeta;
}

const files = glob.sync('**/*.js', {
	cwd: path.resolve(__dirname + '/endpoints/')
});

const endpoints: IEndpoint[] = files.map(f => {
	const ep = require(`./endpoints/${f}`);

	return {
		name: f.replace('.js', ''),
		exec: ep.default,
		meta: ep.meta || {}
	};
});

export default endpoints;
