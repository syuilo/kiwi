import $ from 'cafy';
import define from '../../define';
import { ApiError } from '../../error';
import { Pages } from '../../../../models';
import { Kwr } from '../../../../services/repository';

export const meta = {
	permission: 'delete:page',

	params: {
		id: {
			validator: $.str,
		},

		commit: {
			validator: $.nullable.str,
		},
	},

	errors: {
		noSuchPage: {
			message: 'No such page.',
			code: 'NO_SUCH_PAGE',
			id: '65a9a090-4297-4f72-a857-c0a55c18aeea'
		},
	}
};

export default define(meta, async (ps, user) => {
	const page = await Pages.findOne(ps.id);
	if (page == null) {
		throw new ApiError(meta.errors.noSuchPage);
	}

	// todo: transaction

	await Pages.delete(page.id);

	await Kwr.commit(user, ps.commit, 'delete', 'page', page.id, {});
});
