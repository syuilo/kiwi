import define from '../../define';
import { Pages } from '../../../../models';

export const meta = {
	params: {
	},
};

export default define(meta, async (ps, user) => {
	return await Pages.packMany(await Pages.find({
		where: {
			isPinned: true
		},
		order: {
			title: 'ASC'
		}
	}));
});
