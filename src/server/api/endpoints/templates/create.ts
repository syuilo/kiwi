import $ from 'cafy';
import define from '../../define';
import { ApiError } from "../../error";
import { Templates } from '../../../../models';
import { Kwr } from '../../../../services/repository';
import { ulid } from 'ulid';
import { Template } from '../../../../models/entities/template';

export const meta = {
	permission: 'create:template',

	params: {
		name: {
			validator: $.str,
		},

		attributes: {
			validator: $.arr($.str),
		},

		commit: {
			validator: $.optional.nullable.str,
			default: 'Initial commit'
		},
	},

	errors: {
		alreadyExists: {
			message: 'Template already exists.',
			code: 'ALREADY_EXISTS',
			id: 'f0153c93-a8e9-420d-bbd8-3de3b56d20fe'
		}
	}
};

export default define(meta, async (ps, user) => {
	const exist = await Templates.findOne({
		name: ps.name
	});

	if (exist) {
		throw new ApiError(meta.errors.alreadyExists);
	}

	// todo: transaction
	const template = await Templates.save(new Template({
		id: ulid().toLowerCase(),
		name: ps.name,
		attributes: ps.attributes,
	}));

	await Kwr.commit(user, ps.commit, 'create', 'template', template.id, {
		name: ps.name,
		attributes: ps.attributes,
	});

	return await Templates.pack(template);
});
