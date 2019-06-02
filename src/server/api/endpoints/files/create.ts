import $ from 'cafy';
import define from '../../define';
import { apiLogger } from '../../logger';
import { ApiError } from '../../error';
import { Files } from '../../../../models';
import { Kwfs } from '../../../../services/fs';

export const meta = {
	requireFile: true,

	permission: 'create:file',

	params: {
		folderId: {
			validator: $.optional.nullable.num,
			default: null as any,
		},
	},

	errors: {
		invalidFileName: {
			message: 'Invalid file name.',
			code: 'INVALID_FILE_NAME',
			id: '03077e81-1a88-4471-b8c1-6a6261805899'
		}
	}
};

export default define(meta, async (ps, user, file, cleanup) => {
	// Get 'name' parameter
	let name = file.originalname;
	if (name !== undefined && name !== null) {
		name = name.trim();
		if (name.length === 0) {
			name = null;
		} else if (name === 'blob') {
			name = null;
		} else if (!Files.validateFileName(name)) {
			throw new ApiError(meta.errors.invalidFileName);
		}
	} else {
		name = null;
	}

	try {
		// Create file
		const f = await Kwfs.create(user, file.path, name, null);
		return await Files.pack(f);
	} catch (e) {
		apiLogger.error(e);
		throw new ApiError();
	} finally {
		cleanup!();
	}
});
