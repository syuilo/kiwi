import Vue from 'vue';
import VueRouter from 'vue-router';
import VueI18n from 'vue-i18n';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './app.vue';
import { api } from './scripts/api';
import { detectLang } from './scripts/detect-lang';
import { fetchLocale } from './scripts/fetch-locale';
import { router } from './router';

async function main() {
	Vue.use(VueRouter);
	Vue.use(VueI18n);
	Vue.component('fa', FontAwesomeIcon);

	const lang = await detectLang();
	const locale = await fetchLocale(lang);

	new Vue({
		router: router,
		render: createEl => createEl(App),
		i18n: new VueI18n({
			locale: lang,
			messages: { [lang]: locale }
		}),
		data() {
			return {
				isLoggedin: localStorage.getItem('i') != null
			};
		},
		methods: {
			api
		}
	}).$mount('#app');
}

main();
