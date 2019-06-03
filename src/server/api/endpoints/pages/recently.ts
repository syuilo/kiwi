import $ from 'cafy';
import define from '../../define';
import { Pages } from '../../../../models';

export const meta = {
	params: {
		limit: {
			validator: $.optional.num.range(1, 100),
			default: 30
		},
	},
};

export default define(meta, async (ps, user) => {
	const pages = await Pages.createQueryBuilder('page')
		.orderBy('page.updatedAt', 'DESC')
		.take(ps.limit!)
		.getMany();

	return await Pages.packMany(pages);
});
