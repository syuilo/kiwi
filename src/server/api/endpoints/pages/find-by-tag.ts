import $ from 'cafy';
import define from '../../define';
import { Pages } from '../../../../models';
import { makePaginationQuery } from '../../common/make-pagination-query';

export const meta = {
	params: {
		limit: {
			validator: $.optional.num.range(1, 100),
			default: 30
		},

		sinceId: {
			validator: $.optional.num,
		},

		untilId: {
			validator: $.optional.num,
		},

		sinceDate: {
			validator: $.optional.num,
		},

		untilDate: {
			validator: $.optional.num,
		},

		tag: {
			validator: $.str,
		},
	},
};

export default define(meta, async (ps, user) => {
	const query = makePaginationQuery(Pages.createQueryBuilder('page'), ps.sinceId, ps.untilId);

	const pages = await query
		.andWhere(':tag = ANY(page.tags)', { tag: ps.tag })
		.take(ps.limit!)
		.getMany();

	return await Pages.packMany(pages);
});
