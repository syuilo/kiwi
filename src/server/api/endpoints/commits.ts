import $ from 'cafy';
import define from '../define';
import { Commits } from '../../../models';
import { makePaginationQuery } from '../common/make-pagination-query';

export const meta = {
	params: {
		type: {
			validator: $.optional.nullable.str,
		},

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
	const query = makePaginationQuery(Commits.createQueryBuilder('commit'), ps.sinceId, ps.untilId);

	if (ps.type) {
		query.andWhere(`commit.type = :type`, { type: ps.type });
	}

	const commits = await query
		.take(ps.limit!)
		.getMany();

	return await Commits.packMany(commits);
});
