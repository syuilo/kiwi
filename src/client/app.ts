import Vue from 'vue';
import VueRouter from 'vue-router';
import VueI18n from 'vue-i18n';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './app.vue';
import Page from './views/page.vue';

Vue.use(VueRouter);
Vue.use(VueI18n);

Vue.component('fa', FontAwesomeIcon);

const router = new VueRouter({
	mode: 'history',
	routes: [
		{ path: '/:name*', component: Page, props: true },
	]
});

const app = new Vue({
	router,
	render: createEl => createEl(App),
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
