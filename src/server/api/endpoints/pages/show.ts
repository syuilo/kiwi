import $ from 'cafy';
import define from '../../define';
import { ApiError } from '../../error';
import { Pages } from '../../../../models';
import { types, bool } from '../../../../misc/schema';
import { Page } from '../../../../models/entities/page';

export const meta = {
	params: {
		id: {
			validator: $.optional.str,
		},

		name: {
			validator: $.optional.str,
		},
	},

	res: {
		type: types.object,
		optional: bool.false, nullable: bool.false,
		ref: 'Page',
	},

	errors: {
		noSuchPage: {
			message: 'No such page.',
			code: 'NO_SUCH_PAGE',
			id: '1d5731c3-c4cd-4b32-a148-67c8fde1c181'
		}
	}
};

export default define(meta, async (ps, user) => {
	let page: Page | undefined;

	if (ps.id) {
		page = await Pages.findOne(ps.id);
	} else if (ps.name) {
		page = await Pages.findOne({
			name: ps.name
		});
	}

	if (page == null) {
		throw new ApiError(meta.errors.noSuchPage);
	}

	return await Pages.pack(page, true);
});
