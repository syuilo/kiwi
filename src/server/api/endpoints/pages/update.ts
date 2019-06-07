import $ from 'cafy';
import define from '../../define';
import { ApiError } from '../../error';
import { Pages, Files } from '../../../../models';
import { parseMd } from '../../common/parse-md';
import { Kwr } from '../../../../services/repository';
import { extractLinks } from '../../common/extract-links';

export const meta = {
	permission: 'update:page',

	requireCredential: true,

	requireRecaptcha: true,

	params: {
		id: {
			validator: $.str,
		},

		commit: {
			validator: $.optional.nullable.str,
		},

		title: {
			validator: $.str,
		},

		subTitle: {
			validator: $.str,
		},

		path: {
			validator: Pages.pathValidator,
			transform: (x: string) => x.trim().toLowerCase(),
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

		accessDenied: {
			message: 'Access denied.',
			code: 'ACCESS_DENIED',
			id: '010006a9-3590-40d9-ad08-7cda42e5ec67'
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

	let eyeCatchingImage = null;
	if (ps.eyeCatchingImageId != null) {
		eyeCatchingImage = await Files.findOne(ps.eyeCatchingImageId);

		if (eyeCatchingImage == null) {
			throw new ApiError(meta.errors.noSuchFile);
		}
	}

	const { ast, defAst } = parseMd(ps.content);
	const links = extractLinks(ps.path, [...ast, ...defAst]);

	const tags = ps.tags.filter(tag => tag.length > 0).map(tag => tag.trim());

	// todo: transaction

	await Pages.update(page.id, {
		updatedAt: new Date(),
		title: ps.title.trim(),
		subTitle: ps.subTitle.trim(),
		path: ps.path.trim(),
		content: ps.content.trim(),
		ast: ast,
		defAst: defAst,
		links: links,
		tags: tags,
		attributes: ps.attributes,
		category: ps.category.trim(),
		eyeCatchingImageId: eyeCatchingImage ? eyeCatchingImage.id : null,
		commitMessage: ps.commit,
	});

	await Kwr.commit(user, ps.commit, 'update', 'page', page.id, {
		title: ps.title.trim(),
		subTitle: ps.subTitle.trim(),
		path: ps.path.trim(),
		content: ps.content.trim(),
		tags: tags,
		attributes: ps.attributes,
		category: ps.category.trim(),
		eyeCatchingImageId: eyeCatchingImage ? eyeCatchingImage.id : null,
	});
});
