/**
 * Web Client Server
 */

import ms = require('ms');
import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as send from 'koa-send';
//import * as favicon from 'koa-favicon';
import * as views from 'koa-views';
const locales = require('../../../locales');
import config from '../../config';
import { Metas } from '../../models';

// Init app
const app = new Koa();

// Init renderer
app.use(views(__dirname + '/../../../src/server/web/views', {
	extension: 'pug',
	options: {
		config
	}
}));

// Serve favicon
//app.use(favicon(`${assets}/assets/favicon.ico`));

// Common request handler
app.use(async (ctx, next) => {
	// IFrameの中に入れられないようにする
	ctx.set('X-Frame-Options', 'DENY');
	await next();
});

// Init router
const router = new Router();

router.get('/_assets/:path+', async ctx => {
	await send(ctx as any, ctx.params.path, {
		root:  `${__dirname}/../../assets`,
		maxage: ms('7 days'),
	});
});

router.get('/_locales/:lang', async ctx => {
	ctx.body = locales[ctx.params.lang];
});

// Render base html for all requests
router.get('*', async ctx => {
	const meta = await Metas.fetch();
	await ctx.render('base', {
		wiki: meta,
	});
	ctx.set('Cache-Control', 'public, max-age=300');
});

// Register router
app.use(router.routes());

module.exports = app;
