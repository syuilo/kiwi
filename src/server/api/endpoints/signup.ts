import $ from 'cafy';
import * as bcrypt from 'bcryptjs';
import define from '../define';
import { Users, Metas } from '../../../models';
import generateUserToken from '../common/generate-native-user-token';
import { User } from '../../../models/entities/user';
import { ulid } from 'ulid';

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

	const wiki = await Metas.fetch();

	const usersCount = await Users.count();

	await Users.save(new User({
		id: ulid().toLowerCase(),
		createdAt: new Date(),
		name: ps.name,
		token: secret,
		password: hash,
		isAdmin: usersCount === 0,
		permissions: wiki.defaultPermissions,
	}));

	return {
		token: secret
	};
});
