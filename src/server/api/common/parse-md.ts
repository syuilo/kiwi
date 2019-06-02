import * as unified from 'unified';
const markdown = require('remark-parse');

export function parseMd(md: string) {
	const ast = unified()
		.use(markdown)
		.parse(md);

	function x(tokens: any[], cursor: number, depth: number): any[] {
		const res = [];

		for (; cursor < tokens.length; cursor += 0) {
			const token = tokens[cursor];

			if (token.type === 'heading') {
				if (token.depth > depth) {
					const [children, _cursor] = x(tokens, cursor + 1, depth + 1);
					res.push({
						type: 'section',
						heading: token,
						children: children,
					});
					cursor = _cursor;
				} else {
					break;
				}
			} else {
				res.push(token);
				cursor++;
			}
		}

		return [res, cursor];
	}

	return x(ast.children as any[], 0, 0)[0];
}
