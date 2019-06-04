import $ from 'cafy';
import define from '../../define';
import { types, bool } from '../../../../misc/schema';
import { Pages, Files } from '../../../../models';
import { Page } from '../../../../models/entities/page';
import { ApiError } from '../../error';
import { parseMd } from '../../common/parse-md';
import { Kwr } from '../../../../services/repository';
import { ulid } from 'ulid';
import { extractLinks } from '../../common/extract-links';

export const meta = {
	permission: 'create:page',

	requireCredential: true,

	requireRecaptcha: true,

	params: {
		title: {
			validator: $.str,
		},

		subTitle: {
			validator: $.str,
		},

		path: {
			validator: $.str.min(1).notInclude(['.', ':', '#']),
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

		commit: {
			validator: $.optional.nullable.str,
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
	const links = extractLinks(ps.path, ast);

	const tags = ps.tags.filter(tag => tag.length > 0).map(tag => tag.trim());

	// todo: transaction

	const page = await Pages.save(new Page({
		id: ulid().toLowerCase(),
		createdAt: new Date(),
		updatedAt: new Date(),
		title: ps.title.trim(),
		subTitle: ps.subTitle.trim(),
		path: ps.path.trim(),
		content: ps.content.trim(),
		ast: ast,
		links: links,
		category: ps.category.trim(),
		tags: tags,
		attributes: ps.attributes,
		eyeCatchingImageId: eyeCatchingImage ? eyeCatchingImage.id : null,
		commitMessage: ps.commit,
	}));

	await Kwr.commit(user, ps.commit, 'create', 'page', page.id, {
		title: ps.title.trim(),
		subTitle: ps.subTitle.trim(),
		path: ps.path.trim(),
		content: ps.content.trim(),
		category: ps.category.trim(),
		tags: tags,
		attributes: ps.attributes,
		eyeCatchingImageId: page.eyeCatchingImageId,
	});

	return await Pages.pack(page, true);
});
