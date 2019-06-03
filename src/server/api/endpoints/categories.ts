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

	const dic = {
		pages: 0,
		children: {},
	} as Record<string, any>;

	for (const page of pages) {
		let x = dic.children;
		for (const part of page.category.split('/').filter(p => p.length > 0)) {
			if (x[part]) {
				x[part].pages++;
			} else {
				x[part] = {
					pages: 1,
					children: {},
				};
			}
			x = x[part].children;
		}
	}

	return dic.children;
});
