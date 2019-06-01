import { version } from '../env';

export async function fetchLocale(lang: string): Promise<Record<string, any>> {
	const cachedLocale = localStorage.getItem('locale');
	const localeKey = localStorage.getItem('localeKey');

	if (cachedLocale == null || localeKey != `${version}.${lang}`) {
		const locale = await fetch(`/_locales/${lang}`)
			.then(response => response.json());

		localStorage.setItem('locale', JSON.stringify(locale));
		localStorage.setItem('localeKey', `${version}.${lang}`);

		return locale;
	} else {
		return JSON.parse(cachedLocale);
	}
}
