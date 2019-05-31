import { EntityRepository, Repository } from 'typeorm';
import { Page } from '../entities/page';
import { ensure } from '../../prelude/ensure';
import { awaitAll } from '../../prelude/await-all';

export type PackedPage = any;

@EntityRepository(Page)
export class PageRepository extends Repository<Page> {
	public async pack(
		src: Page['id'] | Page,
	): Promise<PackedPage> {
		const page = typeof src === 'object' ? src : await this.findOne(src).then(ensure);

		const packed = {
			id: page.id,
			name: page.name,
		};

		return await awaitAll(packed);
	}

	public packMany(
		pages: (Page['id'] | Page)[],
	) {
		return Promise.all(pages.map(u => this.pack(u)));
	}
}
