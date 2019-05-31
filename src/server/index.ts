/**
 * Core Server
 */

import * as fs from 'fs';
import * as http from 'http';
import * as http2 from 'http2';
import * as https from 'https';
import * as zlib from 'zlib';
import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as mount from 'koa-mount';
import * as compress from 'koa-compress';
import * as koaLogger from 'koa-logger';

import config from '../config';
import apiServer from './api';
import Logger from '../logger';

export const serverLogger = new Logger('server', 'gray');

// Init app
const app = new Koa();
app.proxy = true;

if (!['production', 'test'].includes(process.env.NODE_ENV || '')) {
	// Logger
	app.use(koaLogger(str => {
		serverLogger.info(str);
	}));
}

// Compress response
app.use(compress({
	flush: zlib.constants.Z_SYNC_FLUSH
}));

// HSTS
// 6months (15552000sec)
if (config.url.startsWith('https') && !config.disableHsts) {
	app.use(async (ctx, next) => {
		ctx.set('strict-transport-security', 'max-age=15552000; preload');
		await next();
	});
}

app.use(mount('/api', apiServer));
app.use(mount('/files', require('./file')));

// Init router
const router = new Router();

// Register router
app.use(router.routes());

app.use(mount(require('./web')));

function createServer() {
	if (config.https) {
		const certs: any = {};
		for (const k of Object.keys(config.https)) {
			certs[k] = fs.readFileSync(config.https[k]);
		}
		certs['allowHTTP1'] = true;
		return http2.createSecureServer(certs, app.callback()) as https.Server;
	} else {
		return http.createServer(app.callback());
	}
}

// For testing
export const startServer = () => {
	const server = createServer();

	// Listen
	server.listen(config.port);

	return server;
};

export default () => new Promise(resolve => {
	const server = createServer();

	// Listen
	server.listen(config.port, resolve);
});
