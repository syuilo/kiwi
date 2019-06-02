import $ from 'cafy';
import define from '../../define';
import { ApiError } from '../../error';
import { Files } from '../../../../models';
import { Kwr } from '../../../../services/repository';

export const meta = {
	permission: 'delete:file',

	params: {
		id: {
			validator: $.str,
		},

		commit: {
			validator: $.nullable.str,
		},
	},

	errors: {
		noSuchFile: {
			message: 'No such file.',
			code: 'NO_SUCH_FILE',
			id: '5be13e5f-17f7-4b94-ac65-712f36170c73'
		}
	}
};

export default define(meta, async (ps, user) => {
	const file = await Files.findOne(ps.id);
	if (file == null) {
		throw new ApiError(meta.errors.noSuchFile);
	}

	// todo: transaction

	await Files.delete(file.id);

	await Kwr.commit(user, ps.commit, 'delete', 'file', file.id, {});
});
