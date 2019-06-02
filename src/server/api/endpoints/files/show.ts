import $ from 'cafy';
import define from '../../define';
import { ApiError } from '../../error';
import { Files } from '../../../../models';

export const meta = {
	params: {
		id: {
			validator: $.str,
		},
	},

	errors: {
		noSuchFile: {
			message: 'No such file.',
			code: 'NO_SUCH_FILE',
			id: 'af465c39-d0c0-40c1-9746-53837fa849c5'
		}
	}
};

export default define(meta, async (ps, user) => {
	const file = await Files.findOne(ps.id);

	if (file == null) {
		throw new ApiError(meta.errors.noSuchFile);
	}

	return await Files.pack(file);
});
