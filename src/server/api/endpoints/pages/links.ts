import $ from 'cafy';
import define from '../../define';
import { ApiError } from '../../error';
import { Pages } from '../../../../models';

export const meta = {
	params: {
		id: {
			validator: $.str,
		},
	},

	errors: {
		noSuchPage: {
			message: 'No such page.',
			code: 'NO_SUCH_PAGE',
			id: '427d2c16-5379-4d76-8483-72dc4a33934f'
		}
	}
};

export default define(meta, async (ps, user) => {
	const page = await Pages.findOne(ps.id);

	if (page == null) {
		throw new ApiError(meta.errors.noSuchPage);
	}

	const links = await Pages.createQueryBuilder('page')
		.andWhere(':path = ANY(page.links)', { path: page.path })
		.getMany();

	return await Pages.packMany(links, false);
});
