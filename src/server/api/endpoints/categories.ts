import define from '../define';
import { Pages } from '../../../models';

export const meta = {
	params: {
	},
};

export default define(meta, async (ps, user) => {
	const pages = await Pages.createQueryBuilder('page')
		.select(['page.category'])
		.getMany();

	return [...new Set(pages.map(page => page.category))];
});
