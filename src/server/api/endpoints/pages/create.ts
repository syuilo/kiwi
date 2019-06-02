import $ from 'cafy';
import define from '../../define';
import { types, bool } from '../../../../misc/schema';
import { Pages, Files } from '../../../../models';
import { Page } from '../../../../models/entities/page';
import { ApiError } from '../../error';
import { parseMd } from '../../common/parse-md';
import { Kwr } from '../../../../services/repository';
import { ulid } from 'ulid';

export const meta = {
	permission: 'create:page',

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

		category: {
			validator: $.str,
		},

		tags: {
			validator: $.arr($.str),
		},

		eyeCatchingImageId: {
			validator: $.optional.nullable.str,
		},

		commit: {
			validator: $.nullable.str,
			default: 'Initial commit'
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

	const ast = parseMd(ps.content);

	// todo: transaction

	const page = await Pages.save(new Page({
		id: ulid().toLowerCase(),
		createdAt: new Date(),
		updatedAt: new Date(),
		title: ps.title,
		subTitle: ps.subTitle,
		name: ps.name,
		content: ps.content,
		ast: ast,
		category: ps.category,
		tags: ps.tags,
		eyeCatchingImageId: eyeCatchingImage ? eyeCatchingImage.id : null,
	}));

	await Kwr.commit(user, ps.commit, 'create', 'page', page.id, {
		title: page.title,
		subTitle: page.subTitle,
		name: page.name,
		content: page.content,
		category: ps.category,
		tags: ps.tags,
		eyeCatchingImageId: page.eyeCatchingImageId,
	});

	return await Pages.pack(page, true);
});
