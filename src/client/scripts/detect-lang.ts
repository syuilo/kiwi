import { langs } from '../env';

export function detectLang(): string {
	let lang = null;

	if (langs.includes(navigator.language)) {
		lang = navigator.language;
	} else {
		lang = langs.find(x => x.split('-')[0] == navigator.language);

		if (lang == null) {
			// Fallback
			lang = 'en-US';
		}
	}

	return lang;
}
