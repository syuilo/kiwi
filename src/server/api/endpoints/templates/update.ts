import $ from 'cafy';
import define from '../../define';
import { ApiError } from '../../error';
import { Templates } from '../../../../models';
import { Kwr } from '../../../../services/repository';

export const meta = {
	permission: 'update:template',

	params: {
		id: {
			validator: $.str,
		},

		commit: {
			validator: $.nullable.str,
		},

		name: {
			validator: $.str,
		},

		attributes: {
			validator: $.arr($.str),
		},
	},

	errors: {
		noSuchTemplate: {
			message: 'No such template.',
			code: 'NO_SUCH_TEMPLATE',
			id: 'd9fa2b67-c2c1-43f4-8a84-37d885af5e1b'
		}
	}
};

export default define(meta, async (ps, user) => {
	const tempalte = await Templates.findOne(ps.id);
	if (tempalte == null) {
		throw new ApiError(meta.errors.noSuchTemplate);
	}

	// todo: transaction

	await Templates.update(tempalte.id, {
		name: ps.name,
		attributes: ps.attributes,
	});

	await Kwr.commit(user, ps.commit, 'update', 'template', tempalte.id, {
		name: ps.name,
		attributes: ps.attributes,
	});
});
