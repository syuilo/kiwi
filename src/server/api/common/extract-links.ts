import config from '../../../config';
import { URL } from 'url';
import * as path from 'path';

export function extractLinks(pagePath: string, ast: any[]): string[] {
	const links: string[] = [];

	const pageDir = pagePath.split('/').slice(0, pagePath.split('/').length - 1).join('/');

	function x(tokens: any[]) {
		for (const token of tokens) {
			if (token.type === 'link') {
				const url = token.url;
				const isExternal = (url.startsWith('http://') || url.startsWith('https://')) && !url.startsWith(config.url);
				if (!isExternal) {
					let link = url.startsWith(config.url) ? new URL(url).pathname : url;
					if (link.startsWith('/')) {
						link = link.substr(1);
					} else {
						link = path.normalize(pageDir + '/' + link).replace(/\\/g, '/');

						if (link.startsWith('/')) {
							link = link.substr(1);
						}

						// invalid path
						if (link.startsWith('.')) {
							link = null;
						}
					}

					if (!links.includes(link)) links.push(link);
				}
			}
			if (token.children) {
				x(token.children);
			}
		}
	}

	x(ast);

	return links.filter(x => x != null);
}
