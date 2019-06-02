import $ from 'cafy';
import define from '../../define';
import { ApiError } from '../../error';
import { Commits } from '../../../../models';

export const meta = {
	params: {
		id: {
			validator: $.num,
		},
	},

	errors: {
		noSuchCommit: {
			message: 'No such commit.',
			code: 'NO_SUCH_COMMIT',
			id: '57668a1b-f8a1-4416-b12a-f0cb1fb59185'
		}
	}
};

export default define(meta, async (ps, user) => {
	const commit = await Commits.findOne(ps.id);

	if (commit == null) {
		throw new ApiError(meta.errors.noSuchCommit);
	}

	return await Commits.pack(commit, true);
});
