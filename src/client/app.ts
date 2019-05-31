import Vue from 'vue';
import VueRouter from 'vue-router';
import VueI18n from 'vue-i18n';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './app.vue';
import Page from './views/page.vue';
import { langs, version } from './env';

async function fetchLocale(lang: string): Promise<Record<string, any>> {
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

function detectLocale(): string {
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

async function main() {
	Vue.use(VueRouter);
	Vue.use(VueI18n);
	Vue.component('fa', FontAwesomeIcon);

	const router = new VueRouter({
		mode: 'history',
		routes: [
			{ path: '/\\:new', component: () => import('./views/new.vue').then(m => m.default) },
			{ path: '/:name*', component: Page, props: true },
		]
	});

	const lang = await detectLocale();
	const locale = await fetchLocale(lang);

	const app = new Vue({
		router,
		render: createEl => createEl(App),
		i18n: new VueI18n({
			locale: lang,
			messages: { [lang]: locale }
		}),
		methods: {
			api(endpoint: string, data: Record<string, any> = {}) {
				return new Promise((resolve, reject) => {
					fetch(`/api/${endpoint}`, {
						method: 'POST',
						body: JSON.stringify(data),
						credentials: 'omit',
						cache: 'no-cache'
					}).then(async (res) => {
						const body = res.status === 204 ? null : await res.json();

						if (res.status === 200) {
							resolve(body);
						} else if (res.status === 204) {
							resolve();
						} else {
							reject(body.error);
						}
					}).catch(reject);
				});
			}
		}
	}).$mount('#app');
}

main();
