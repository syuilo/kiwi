/**
 * File Server
 */

import * as Koa from 'koa';
import * as cors from '@koa/cors';
import * as Router from 'koa-router';
import { Files } from '../../models';
import { Kwfs } from '../../services/fs';

// Init app
const app = new Koa();
app.use(cors());

// Init router
const router = new Router();

router.get('/:id', async ctx => {
	const id = ctx.params.id;

	// Fetch file
	const file = await Files.findOne(id);

	if (file == null) {
		ctx.status = 404;
		return;
	}

	const readable = Kwfs.read(file.file);
	ctx.set('Content-Type', file.type);
	ctx.body = readable;
});

// Register router
app.use(router.routes());

module.exports = app;
