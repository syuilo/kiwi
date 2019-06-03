import define from '../define';
import { Metas } from '../../../models';

export const meta = {
	params: {},
};

export default define(meta, async (ps, user) => {
	return Metas.pack(await Metas.fetch(), user && user.isAdmin);
});
