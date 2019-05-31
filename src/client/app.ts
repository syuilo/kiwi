import Vue from 'vue';
import VueRouter from 'vue-router';
import VueI18n from 'vue-i18n';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './app.vue';
import { version, lang, locale } from './env';

Vue.use(VueRouter);
Vue.use(VueI18n);

Vue.component('fa', FontAwesomeIcon);
