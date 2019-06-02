import * as unified from 'unified';
const markdown = require('remark-parse');

export function parseMd(md: string) {
	return unified()
		.use(markdown)
		.parse(md);
}
