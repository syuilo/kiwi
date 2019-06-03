import config from '../../../config';
import { URL } from 'url';

export function extractLinks(ast: any[]): string[] {
	const links: string[] = [];

	function x(tokens: any[]) {
		for (const token of tokens) {
			if (token.type === 'link') {
				const url = token.url;
				const isExternal = (url.startsWith('http://') || url.startsWith('https://')) && !url.startsWith(config.url);
				if (!isExternal) {
					const link = url.startsWith(config.url) ? new URL(url).pathname.substr(1) : url;
					if (!links.includes(link)) links.push(link);
				}
			}
			if (token.children) {
				x(token.children);
			}
		}
	}

	x(ast);

	return links;
}
