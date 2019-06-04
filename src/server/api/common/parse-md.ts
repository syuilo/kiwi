import * as unified from 'unified';
const markdown = require('remark-parse');
const NodeToString = require('mdast-util-to-string');
const GithubSlugger = require('github-slugger');

const slugger = new GithubSlugger();

export function parseMd(md: string) {
	const ast = unified()
		.use(markdown, {
			footnotes: true
		})
		.parse(md);

	slugger.reset();

	function x(tokens: any[], cursor: number, depth: number): any[] {
		const res = [];

		for (; cursor < tokens.length; cursor += 0) {
			const token = tokens[cursor];

			if (token.type === 'heading') {
				if (token.depth > depth) {
					const text = NodeToString(token);
					const id = slugger.slug(text);
					const [children, _cursor] = x(tokens, cursor + 1, depth + 1);
					res.push({
						type: 'section',
						heading: token,
						children: children,
						id: id,
						content: text
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

	const tokens = x(ast.children as any[], 0, 0)[0];

	function clean(tokens: any[]): void {
		for (const token of tokens) {
			delete token.position;
			if (token.children) clean(token.children);
			if (token.heading) {
				delete token.heading.position;
				if (token.heading.children) clean(token.heading.children);
			}
		}
	}

	clean(tokens);

	return tokens;
}
