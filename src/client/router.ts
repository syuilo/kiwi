import VueRouter from 'vue-router';
import Page from './views/page.vue';

export const router = new VueRouter({
	mode: 'history',
	routes: [
		{ path: '/\\:new', component: () => import('./views/new.vue').then(m => m.default) },
		{ path: '/:name*', component: Page, props: true },
	]
});
