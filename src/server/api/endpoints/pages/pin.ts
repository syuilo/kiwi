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

		pinned: {
			validator: $.bool,
		},
	},

	errors: {
		noSuchPage: {
			message: 'No such page.',
			code: 'NO_SUCH_PAGE',
			id: '95063979-ecfe-4cb6-aed1-f4693c37f6be'
		},
	}
};

export default define(meta, async (ps, user) => {
	const page = await Pages.findOne(ps.id);
	if (page == null) {
		throw new ApiError(meta.errors.noSuchPage);
	}

	await Pages.update(page.id, {
		isPinned: ps.pinned,
	});
});
