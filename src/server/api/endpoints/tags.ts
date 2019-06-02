import define from '../define';
import { Pages } from '../../../models';

export const meta = {
	params: {
	},
};

export default define(meta, async (ps, user) => {
	const pages = await Pages.createQueryBuilder('page')
		.select(['page.tags'])
		.getMany();

	console.log(pages);

	const res = {} as Record<string, number>;

	for (const page of pages) {
		for (const tag of page.tags) {
			if (res[tag]) {
				res[tag]++;
			} else {
				res[tag] = 1;
			}
		}
	}

	return res;
});
