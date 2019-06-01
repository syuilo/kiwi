import $ from 'cafy';
import define from '../../define';
import { types, bool } from '../../../../misc/schema';
import { Pages, Files } from '../../../../models';
import { Page } from '../../../../models/entities/page';
import { ApiError } from '../../error';

export const meta = {
	kind: 'write:pages',

	params: {
		title: {
			validator: $.str,
		},

		subTitle: {
			validator: $.str,
		},

		name: {
			validator: $.str,
		},

		content: {
			validator: $.str,
		},

		eyeCatchingImageId: {
			validator: $.optional.nullable.num,
		},
	},

	res: {
		type: types.object,
		optional: bool.false, nullable: bool.false,
		ref: 'Page',
	},

	errors: {
		noSuchFile: {
			message: 'No such file.',
			code: 'NO_SUCH_FILE',
			id: 'b9a357b9-8014-42b8-9fb8-40043b9f0c91'
		},
	}
};

export default define(meta, async (ps, user) => {
	let eyeCatchingImage = null;
	if (ps.eyeCatchingImageId != null) {
		eyeCatchingImage = await Files.findOne(ps.eyeCatchingImageId);

		if (eyeCatchingImage == null) {
			throw new ApiError(meta.errors.noSuchFile);
		}
	}

	const page = await Pages.save(new Page({
		createdAt: new Date(),
		updatedAt: new Date(),
		title: ps.title,
		subTitle: ps.subTitle,
		name: ps.name,
		content: ps.content,
		eyeCatchingImageId: eyeCatchingImage ? eyeCatchingImage.id : null,
	}));

	return await Pages.pack(page);
});
