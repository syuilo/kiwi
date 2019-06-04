import VueRouter from 'vue-router';
import Page from './pages/page.vue';

export const router = new VueRouter({
	mode: 'history',
	routes: [
		{ path: '/\\:signup', component: () => import('./pages/signup.vue').then(m => m.default) },
		{ path: '/\\:signin', component: () => import('./pages/signin.vue').then(m => m.default) },
		{ path: '/\\:pages', component: () => import('./pages/pages.vue').then(m => m.default) },
		{ path: '/\\:recently', component: () => import('./pages/recently.vue').then(m => m.default) },
		{ path: '/\\:new', component: () => import('./pages/edit.vue').then(m => m.default) },
		{ path: '/\\:new/:initPath*', component: () => import('./pages/edit.vue').then(m => m.default), props: true },
		{ path: '/\\:new-template', component: () => import('./pages/edit-template.vue').then(m => m.default) },
		{ path: '/\\:new-template/:initName', component: () => import('./pages/edit-template.vue').then(m => m.default), props: true },
		{ path: '/\\:edit/:pageId', component: () => import('./pages/edit.vue').then(m => m.default), props: true },
		{ path: '/\\:edit-template/:templateId', component: () => import('./pages/edit-template.vue').then(m => m.default), props: true },
		{ path: '/\\:delete/:pageId', component: () => import('./pages/delete.vue').then(m => m.default), props: true },
		{ path: '/\\:delete-file/:fileId', component: () => import('./pages/delete-file.vue').then(m => m.default), props: true },
		{ path: '/\\:upload', component: () => import('./pages/upload.vue').then(m => m.default) },
		{ path: '/\\:files', component: () => import('./pages/files.vue').then(m => m.default) },
		{ path: '/\\:file/:fileId', component: () => import('./pages/file.vue').then(m => m.default), props: true },
		{ path: '/\\:tags/:tag', component: () => import('./pages/tag.vue').then(m => m.default), props: true },
		{ path: '/\\:categories/:category*', component: () => import('./pages/category.vue').then(m => m.default), props: true },
		{ path: '/\\:diff/:commitId', component: () => import('./pages/diff.vue').then(m => m.default), props: true },
		{ path: '/\\:admin', component: () => import('./pages/admin.vue').then(m => m.default) },
		{ path: '/\\:admin/wiki', component: () => import('./pages/admin.wiki.vue').then(m => m.default) },
		{ path: '/\\:admin/commits', component: () => import('./pages/admin.commits.vue').then(m => m.default) },
		{ path: '/:path*', component: Page, props: true },
	]
});
