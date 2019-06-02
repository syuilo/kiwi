import VueRouter from 'vue-router';
import Page from './views/page.vue';

export const router = new VueRouter({
	mode: 'history',
	routes: [
		{ path: '/\\:signup', component: () => import('./views/signup.vue').then(m => m.default) },
		{ path: '/\\:signin', component: () => import('./views/signin.vue').then(m => m.default) },
		{ path: '/\\:new', component: () => import('./views/edit.vue').then(m => m.default) },
		{ path: '/\\:edit/:pageId', component: () => import('./views/edit.vue').then(m => m.default), props: true },
		{ path: '/:name*', component: Page, props: true },
	]
});
