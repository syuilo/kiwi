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
	const pages = await Pages.createQueryBuilder('page')
		.select(['page.content', 'page.id'])
		.getMany();

	const matches = pages.filter(page => page.content.includes(ps.query)).map(page => page.id);

	return await Pages.packMany(matches);
});
