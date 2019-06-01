import define from '../define';
import { Users } from '../../../models';
import { types, bool } from '../../../misc/schema';

export const meta = {
	requireCredential: true,

	params: {},

	res: {
		type: types.object,
		optional: bool.false, nullable: bool.false,
		ref: 'User',
	},
};

export default define(meta, async (ps, user) => {
	return await Users.pack(user);
});
