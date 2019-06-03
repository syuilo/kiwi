import $ from 'cafy';
import define from '../../define';
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
			validator: $.nullable.str,
			default: 'Initial commit'
		},
	},
};

export default define(meta, async (ps, user) => {
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
