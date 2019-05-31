import $ from 'cafy';
import * as bcrypt from 'bcryptjs';
import define from '../define';
import { Users } from '../../../models';
import generateUserToken from '../common/generate-native-user-token';
import { User } from '../../../models/entities/user';

export const meta = {
	params: {
		name: {
			validator: $.str.range(1, 32).match(/^[a-z0-9_]+$/),
		},
		password: {
			validator: $.str,
		},
	},
};

export default define(meta, async (ps) => {
	// Generate hash of password
	const salt = await bcrypt.genSalt(8);
	const hash = await bcrypt.hash(ps.password, salt);

	// Generate secret
	const secret = generateUserToken();

	const user = await Users.save(new User({
		createdAt: new Date(),
		name: ps.name,
		token: secret,
		password: hash
	}));

	return await Users.pack(user);
});
