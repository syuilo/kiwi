import Vue from 'vue';
import VueRouter from 'vue-router';
import VueI18n from 'vue-i18n';
import VueTimeago from 'vue-timeago';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './app.vue';
import { api } from './scripts/api';
import { detectLang } from './scripts/detect-lang';
import { fetchLocale } from './scripts/fetch-locale';
import { router } from './router';

async function main() {
	const lang = await detectLang();
	const locale = await fetchLocale(lang);

	Vue.use(VueRouter);
	Vue.use(VueI18n);
	Vue.use(VueTimeago, {
		name: 'Timeago',
		locale: lang,
		locales: {
			'zh-CN': require('date-fns/locale/zh_cn'),
			'ja-JP': require('date-fns/locale/ja')
		}
	});
	Vue.component('fa', FontAwesomeIcon);

	new Vue({
		router: router,
		render: createEl => createEl(App),
		i18n: new VueI18n({
			locale: lang,
			messages: { [lang]: locale }
		}),
		data() {
			return {
				wiki: null,
				user: null,
				isLoggedin: localStorage.getItem('i') != null
			};
		},
		created() {
			this.api('wiki').then(wiki => {
				this.wiki = wiki;
			});

			if (this.isLoggedin) {
				this.api('i').then(account => {
					this.user = account;
				});
			}
		},
		methods: {
			api
		}
	}).$mount('#app');
}

main();
