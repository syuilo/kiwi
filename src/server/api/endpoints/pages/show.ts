import $ from 'cafy';
import define from '../../define';
import { ApiError } from '../../error';
import { Pages } from '../../../../models';
import { types, bool } from '../../../../misc/schema';
import { Page } from '../../../../models/entities/page';
import { resolvePath } from '../../common/resolve-path';

export const meta = {
	params: {
		id: {
			validator: $.optional.str,
		},

		path: {
			validator: $.optional.str,
		},

		currentPath: {
			validator: $.optional.nullable.str,
		},

		detail: {
			validator: $.optional.bool,
			default: true
		},

		raw: {
			validator: $.optional.bool,
			default: true
		}
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
	} else if (ps.path) {
		if (ps.currentPath !== undefined && ps.currentPath !== null) {
			page = await Pages.findOne({
				path: resolvePath(ps.path, ps.currentPath)
			});
		} else {
			page = await Pages.findOne({
				path: ps.path
			});
		}
	}

	if (page == null) {
		throw new ApiError(meta.errors.noSuchPage);
	}

	return await Pages.pack(page, ps.detail, ps.raw);
});
