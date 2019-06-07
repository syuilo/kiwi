<template>
<kw-container>
	<template #title>
		<span v-t="'login'"></span>
	</template>

	<form @submit.prevent="submit()">
		<kw-input v-model="name" pattern="^[a-z0-9_]+$" required autocomplete="username"><p v-t="'_login.name'"></p></kw-input>
		<kw-input v-model="password" type="password" required autocomplete="current-password"><p v-t="'_login.password'"></p></kw-input>
		<vue-recaptcha v-if="$root.wiki && $root.wiki.recaptchaSiteKey" :sitekey="$root.wiki.recaptchaSiteKey" @verify="onVerify"></vue-recaptcha>
		<kw-button v-t="'_login.login'" type="submit"></kw-button>
	</form>

	<template #footer>
		<span v-t="'_login.haveNoAccount'" style="margin-right: 16px;"></span><router-link :to="$route.query.callback ? `/:signup?callback=${$route.query.callback}` : '/:signup'" v-t="'signup'"></router-link>
	</template>
</kw-container>
</template>

<script lang="ts">
import Vue from 'vue';
import KwContainer from '../components/container.vue';
import KwInput from '../components/input.vue';
import KwButton from '../components/button.vue';

export default Vue.extend({
	components: {
		KwContainer, KwInput, KwButton
	},

	data() {
		return {
			name: '',
			password: '',
			recaptcha: null,
		};
	},

	methods: {
		submit() {
			this.$root.api('signin', {
				name: this.name,
				password: this.password,
				_recaptcha: this.recaptcha,
			}).then(({ token }) => {
				localStorage.setItem('i', token);
				location.href = this.$route.query.callback || '/';
			});
		},

		onVerify(res) {
			this.recaptcha = res;
		}
	}
});
</script>
