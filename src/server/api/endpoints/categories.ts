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

	const res = {} as Record<string, number>;

	for (const page of pages) {
		const c = page.category.split('/')[0];
		if (res[c]) {
			res[c]++;
		} else {
			res[c] = 1;
		}
	}

	return res;
});
