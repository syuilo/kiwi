import { EntityRepository, Repository } from 'typeorm';
import { Page } from '../entities/page';
import { ensure } from '../../prelude/ensure';
import { awaitAll } from '../../prelude/await-all';

export type PackedPage = any;

@EntityRepository(Page)
export class PageRepository extends Repository<Page> {
	public async pack(
		src: Page['id'] | Page,
		detail = false
	): Promise<PackedPage> {
		const page = typeof src === 'object' ? src : await this.findOne(src).then(ensure);

		const packed = {
			id: page.id,
			updatedAt: page.updatedAt,
			name: page.name,
			title: page.title,
			subTitle: page.subTitle,
			category: page.category,
			tags: page.tags,
			attributes: page.attributes,
			content: detail ? page.content : undefined,
			ast: detail ? page.ast : undefined,
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
