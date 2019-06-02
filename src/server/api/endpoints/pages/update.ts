import $ from 'cafy';
import define from '../../define';
import { ApiError } from '../../error';
import { Pages, Files, Commits } from '../../../../models';
import { parseMd } from '../../common/parse-md';
import { Commit } from '../../../../models/entities/commit';

export const meta = {
	kind: 'write:pages',

	params: {
		pageId: {
			validator: $.num,
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

		eyeCatchingImageId: {
			validator: $.optional.nullable.num,
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
	const page = await Pages.findOne(ps.pageId);
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
		ast: ast as Record<string, any>,
		eyeCatchingImageId: eyeCatchingImage ? eyeCatchingImage.id : null,
	});

	await Commits.save(new Commit({
		createdAt: new Date(),
		type: 'page',
		userId: user ? user.id : null,
		message: ps.commit,
		content: {
			title: page.title,
			subTitle: page.subTitle,
			name: page.name,
			content: page.content,
			eyeCatchingImageId: page.eyeCatchingImageId,
		},
	}));
});
