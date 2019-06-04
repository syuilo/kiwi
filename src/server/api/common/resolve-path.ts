import * as path from 'path';
import config from '../../../config';

export function resolvePath(url: string, current: string): string {
	const currentDir = current.split('/').slice(0, current.split('/').length - 1).join('/');

	const isExternal = (url.startsWith('http://') || url.startsWith('https://')) && !url.startsWith(config.url);
	if (isExternal) {
		throw new Error('got external link');
	}

	let link = url.startsWith(config.url) ? new URL(url).pathname : url;
	if (link.startsWith('/')) {
		link = link.substr(1);
	} else {
		link = path.normalize(currentDir + '/' + link).replace(/\\/g, '/');

		if (link.startsWith('/')) {
			link = link.substr(1);
		}

		// invalid path
		if (link.startsWith('.')) {
			throw new Error('got invalid link');
		}
	}

	return link;
}
