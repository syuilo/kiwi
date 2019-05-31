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
	routes: [
		{ path: '/:name*', component: Page },
	]
});

const app = new Vue({
	router,
	render: createEl => createEl(App)
}).$mount('#app');
