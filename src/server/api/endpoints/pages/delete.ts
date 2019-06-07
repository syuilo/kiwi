import $ from 'cafy';
import define from '../../define';
import { ApiError } from '../../error';
import { Pages } from '../../../../models';
import { Kwr } from '../../../../services/repository';

export const meta = {
	permission: 'delete:page',

	requireCredential: true,

	requireRecaptcha: true,

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

		accessDenied: {
			message: 'Access denied.',
			code: 'ACCESS_DENIED',
			id: 'fa7469fa-0bba-4a0e-9f2b-367d871daff3'
		},
	}
};

export default define(meta, async (ps, user) => {
	const page = await Pages.findOne(ps.id);
	if (page == null) {
		throw new ApiError(meta.errors.noSuchPage);
	}

	if (page.isLocked && !user.isAdmin) {
		throw new ApiError(meta.errors.accessDenied);
	}

	// todo: transaction

	await Pages.delete(page.id);

	await Kwr.commit(user, ps.commit, 'delete', 'page', page.id, {});
});
