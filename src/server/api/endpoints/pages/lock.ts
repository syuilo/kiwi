import $ from 'cafy';
import define from '../../define';
import { ApiError } from '../../error';
import { Pages } from '../../../../models';

export const meta = {
	permission: 'update:wiki',

	requireCredential: true,

	params: {
		id: {
			validator: $.str,
		},

		locked: {
			validator: $.bool,
		},
	},

	errors: {
		noSuchPage: {
			message: 'No such page.',
			code: 'NO_SUCH_PAGE',
			id: 'a61a149e-a4b9-4fe1-893a-01a51ea31117'
		},
	}
};

export default define(meta, async (ps, user) => {
	const page = await Pages.findOne(ps.id);
	if (page == null) {
		throw new ApiError(meta.errors.noSuchPage);
	}

	await Pages.update(page.id, {
		isLocked: ps.locked,
	});
});
