import $ from 'cafy';
import define from '../define';
import { Pages } from '../../../models';
import { makePaginationQuery } from '../common/make-pagination-query';

export const meta = {
	params: {
		limit: {
			validator: $.optional.num.range(1, 100),
			default: 30
		},

		sinceId: {
			validator: $.optional.str,
		},

		untilId: {
			validator: $.optional.str,
		},

		sinceDate: {
			validator: $.optional.num,
		},

		untilDate: {
			validator: $.optional.num,
		},
	},
};

export default define(meta, async (ps, user) => {
	const query = makePaginationQuery(Pages.createQueryBuilder('page'), ps.sinceId, ps.untilId);

	const pages = await query
		.take(ps.limit!)
		.getMany();

	return await Pages.packMany(pages);
});
