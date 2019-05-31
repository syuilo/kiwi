import { createConnection, getConnection } from 'typeorm';
import config from './config';

import { User } from './models/entities/user';
import { Meta } from './models/entities/meta';
import { Page } from './models/entities/page';

export function initDb(justBorrow = false, sync = false, log = false) {
	try {
		const conn = getConnection();
		return Promise.resolve(conn);
	} catch (e) {}

	return createConnection({
		type: 'postgres',
		host: config.db.host,
		port: config.db.port,
		username: config.db.user,
		password: config.db.pass,
		database: config.db.db,
		extra: config.db.extra,
		synchronize: process.env.NODE_ENV === 'test' || sync,
		dropSchema: process.env.NODE_ENV === 'test' && !justBorrow,
		logging: log,
		entities: [
			User,
			Meta,
			Page,
		]
	});
}
