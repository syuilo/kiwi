import VueRouter from 'vue-router';
import Page from './pages/page.vue';

export const router = new VueRouter({
	mode: 'history',
	routes: [
		{ path: '/\\:signup', component: () => import('./pages/signup.vue').then(m => m.default) },
		{ path: '/\\:signin', component: () => import('./pages/signin.vue').then(m => m.default) },
		{ path: '/\\:new', component: () => import('./pages/edit.vue').then(m => m.default) },
		{ path: '/\\:edit/:pageId', component: () => import('./pages/edit.vue').then(m => m.default), props: true },
		{ path: '/\\:upload', component: () => import('./pages/upload.vue').then(m => m.default) },
		{ path: '/\\:file/:fileId', component: () => import('./pages/file.vue').then(m => m.default), props: true },
		{ path: '/:name*', component: Page, props: true },
	]
});
