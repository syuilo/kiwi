import $ from 'cafy';
import define from '../../define';
import { ApiError } from '../../error';
import { Pages, Files } from '../../../../models';
import { parseMd } from '../../common/parse-md';
import { Kwr } from '../../../../services/repository';

export const meta = {
	permission: 'update:page',

	params: {
		id: {
			validator: $.str,
		},

		commit: {
			validator: $.nullable.str,
		},

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

		attributes: {
			validator: $.obj(),
		},

		eyeCatchingImageId: {
			validator: $.optional.nullable.str,
		},
	},

	errors: {
		noSuchPage: {
			message: 'No such page.',
			code: 'NO_SUCH_PAGE',
			id: 'a7148941-2313-4e81-a53e-bfa1a272bd7f'
		},

		noSuchFile: {
			message: 'No such file.',
			code: 'NO_SUCH_FILE',
			id: '42071042-025e-4ae0-b54c-169af6d02c33'
		},
	}
};

export default define(meta, async (ps, user) => {
	const page = await Pages.findOne(ps.id);
	if (page == null) {
		throw new ApiError(meta.errors.noSuchPage);
	}

	let eyeCatchingImage = null;
	if (ps.eyeCatchingImageId != null) {
		eyeCatchingImage = await Files.findOne(ps.eyeCatchingImageId);

		if (eyeCatchingImage == null) {
			throw new ApiError(meta.errors.noSuchFile);
		}
	}

	const ast = parseMd(ps.content);

	// todo: transaction

	await Pages.update(page.id, {
		updatedAt: new Date(),
		title: ps.title,
		subTitle: ps.subTitle,
		name: ps.name,
		content: ps.content,
		ast: ast,
		tags: ps.tags,
		attributes: ps.attributes,
		category: ps.category,
		eyeCatchingImageId: eyeCatchingImage ? eyeCatchingImage.id : null,
	});

	await Kwr.commit(user, ps.commit, 'update', 'page', page.id, {
		title: ps.title,
		subTitle: ps.subTitle,
		name: ps.name,
		content: ps.content,
		tags: ps.tags,
		attributes: ps.attributes,
		category: ps.category,
		eyeCatchingImageId: eyeCatchingImage ? eyeCatchingImage.id : null,
	});
});
