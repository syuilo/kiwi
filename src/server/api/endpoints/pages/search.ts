import $ from 'cafy';
import define from '../../define';
import { Pages } from '../../../../models';

export const meta = {
	params: {
		query: {
			validator: $.str,
		}
	},
};

export default define(meta, async (ps, user) => {
	const q = ps.query.toLowerCase();

	const pages = await Pages.createQueryBuilder('page')
		.select(['page.content', 'page.title', 'page.subTitle', 'page.id'])
		.getMany();

	const matches = pages.filter(page =>
		page.content.toLowerCase().includes(q) ||
		page.title.toLowerCase().includes(q) ||
		page.subTitle.toLowerCase().includes(q)
	).map(page => page.id);

	return await Pages.packMany(matches);
});
