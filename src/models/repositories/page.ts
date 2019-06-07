import $ from 'cafy';
import { EntityRepository, Repository } from 'typeorm';
import { Page } from '../entities/page';
import { ensure } from '../../prelude/ensure';
import { awaitAll } from '../../prelude/await-all';

export type PackedPage = any;

@EntityRepository(Page)
export class PageRepository extends Repository<Page> {
	public pathValidator = $.str
		.max(256)
		.notInclude([':', '#'])
		.pipe(x => !x.startsWith('_'))
		.pipe(x => !x.startsWith('.'))
		.pipe(x => !x.endsWith('.'))
		.pipe(x => !x.endsWith('/'))
		.pipe(x => !x.endsWith('/'))
		.pipe(x => !x.startsWith(' '))
		.pipe(x => !x.endsWith(' '));

	public async pack(
		src: Page['id'] | Page,
		detail = false,
		raw = true
	): Promise<PackedPage> {
		const page = typeof src === 'object' ? src : await this.findOne(src).then(ensure);

		const packed = {
			id: page.id,
			updatedAt: page.updatedAt,
			path: page.path,
			title: page.title,
			subTitle: page.subTitle,
			category: page.category,
			tags: page.tags,
			attributes: page.attributes,
			commitMessage: page.commitMessage,
			content: detail && raw ? page.content : undefined,
			ast: detail ? page.ast : undefined,
			defAst: detail ? page.defAst : undefined,
			isLocked: detail && page.isLocked ? page.isLocked : undefined,
			isPinned: detail && page.isPinned ? page.isPinned : undefined,
		};

		return await awaitAll(packed);
	}

	public packMany(
		pages: (Page['id'] | Page)[],
		detail = false
	) {
		return Promise.all(pages.map(u => this.pack(u, detail)));
	}
}
