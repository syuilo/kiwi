import $ from 'cafy';
import define from '../define';
import { Files } from '../../../models';
import { makePaginationQuery } from '../common/make-pagination-query';

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
	},
};

export default define(meta, async (ps, user) => {
	const query = makePaginationQuery(Files.createQueryBuilder('file'), ps.sinceId, ps.untilId);

	const files = await query
		.take(ps.limit!)
		.getMany();

	return await Files.packMany(files);
});
