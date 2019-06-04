import $ from 'cafy';
import define from '../../define';
import { ApiError } from '../../error';
import { Templates } from '../../../../models';
import { Kwr } from '../../../../services/repository';

export const meta = {
	permission: 'delete:template',

	requireCredential: true,

	requireRecaptcha: true,

	params: {
		id: {
			validator: $.str,
		},

		commit: {
			validator: $.nullable.str,
		},
	},

	errors: {
		noSuchTemplate: {
			message: 'No such template.',
			code: 'NO_SUCH_TEMPLATE',
			id: 'd54be53e-3ca6-451b-989f-f5bbc25527b6'
		},
	}
};

export default define(meta, async (ps, user) => {
	const template = await Templates.findOne(ps.id);
	if (template == null) {
		throw new ApiError(meta.errors.noSuchTemplate);
	}

	// todo: transaction

	await Templates.delete(template.id);

	await Kwr.commit(user, ps.commit, 'delete', 'template', template.id, {});
});
