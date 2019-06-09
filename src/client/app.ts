import Vue from 'vue';
import VueRouter from 'vue-router';
import VueI18n from 'vue-i18n';
import VueSwal from 'vue-swal';
import VueTimeago from 'vue-timeago';
import VueRecaptcha from 'vue-recaptcha';
import Ads from 'vue-google-adsense';
import VueMeta from 'vue-meta';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './app.vue';
import { api } from './scripts/api';
import { detectLang } from './scripts/detect-lang';
import { fetchLocale } from './scripts/fetch-locale';
import { router } from './router';

// Detect the user agent
const ua = navigator.userAgent.toLowerCase();
const isMobile = /mobile|iphone|ipad|android/.test(ua);

// Get the <head> element
const head = document.getElementsByTagName('head')[0];

// If mobile, insert the viewport meta tag
if (isMobile) {
	const meta = document.createElement('meta');
	meta.setAttribute('name', 'viewport');
	meta.setAttribute('content', 'width=device-width, initial-scale=1');
	head.appendChild(meta);
}

async function main() {
	const lang = await detectLang();
	const locale = await fetchLocale(lang);

	Vue.use(VueRouter);
	Vue.use(VueI18n);
	Vue.use(VueSwal);
	Vue.use(VueTimeago, {
		name: 'Timeago',
		locale: lang,
		locales: {
			'zh-CN': require('date-fns/locale/zh_cn'),
			'ja-JP': require('date-fns/locale/ja')
		}
	});
	Vue.use(require('vue-script2'));
	Vue.use(Ads.Adsense);
	Vue.use(Ads.InArticleAdsense);
	Vue.use(VueMeta, {
		refreshOnceOnNavigation: true
	});
	Vue.component('vue-recaptcha', VueRecaptcha);
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
				isLoggedin: localStorage.getItem('i') != null,
				isMobile
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
