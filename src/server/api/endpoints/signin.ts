import $ from 'cafy';
import * as bcrypt from 'bcryptjs';
import define from '../define';
import { Users } from '../../../models';
import { ApiError } from '../error';

export const meta = {
	params: {
		name: {
			validator: $.str,
		},
		password: {
			validator: $.str,
		},
	},

	errors: {
		noSuchUser: {
			message: 'No such user.',
			code: 'NO_SUCH_USER',
			id: '08277c53-1b84-4423-93b6-61bcd48d5a4a'
		},

		incorrectPassword: {
			message: 'Incorrect password.',
			code: 'INCORRECT_PASSWORD',
			id: '7f1b38da-93d9-48c2-9b1f-85159f9de801'
		},
	}
};

export default define(meta, async (ps) => {
	// Fetch user
	const user = await Users.findOne({
		name: ps.name.toLowerCase(),
	});

	if (user == null) {
		throw new ApiError(meta.errors.noSuchUser);
	}

	// Compare password
	const same = await bcrypt.compare(ps.password, user.password);

	if (same) {
		return await Users.pack(user);
	} else {
		throw new ApiError(meta.errors.incorrectPassword);
	}
});
