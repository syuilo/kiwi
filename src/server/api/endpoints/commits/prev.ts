import $ from 'cafy';
import define from '../../define';
import { ApiError } from '../../error';
import { Commits } from '../../../../models';
import { LessThan } from 'typeorm';

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
			id: '88522169-6212-4442-a723-c315320f3e2b'
		}
	}
};

export default define(meta, async (ps, user) => {
	const commit = await Commits.findOne(ps.id);

	if (commit == null) {
		throw new ApiError(meta.errors.noSuchCommit);
	}

	const prev = await Commits.findOne({
		where: {
			id: LessThan(commit.id),
			key: commit.key,
		},
		order: {
			id: 'DESC'
		}
	});

	if (prev == null) {
		return null;
	}

	return await Commits.pack(prev, true);
});
