/**
 * File Server
 */

import * as Koa from 'koa';
import * as cors from '@koa/cors';
import * as Router from 'koa-router';

// Init app
const app = new Koa();
app.use(cors());

app.use(async (ctx, next) => {
	// Cache 365days
	ctx.set('Cache-Control', 'max-age=31536000, immutable');
	await next();
});

// Init router
const router = new Router();

//router.get('/:id', sendFile);

// Register router
app.use(router.routes());

module.exports = app;
