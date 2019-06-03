<template>
<kw-container>
	<template #title>
		<span v-t="'signup'"></span>
	</template>

	<kw-input v-model="name"><p v-t="'_signup.name'"></p></kw-input>
	<kw-input v-model="password" type="password"><p v-t="'_signup.password'"></p></kw-input>
	<vue-recaptcha v-if="$root.wiki && $root.wiki.recaptchaSiteKey" :sitekey="$root.wiki.recaptchaSiteKey" @verify="onVerify"></vue-recaptcha>
	<kw-button v-t="'_signup.signup'" @click="submit()"></kw-button>
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
			this.$root.api('signup', {
				name: this.name,
				password: this.password,
				_recaptcha: this.recaptcha,
			}).then(({ token }) => {
				localStorage.setItem('i', token);
				location.href = '/';
			});
		},

		onVerify(res) {
			this.recaptcha = res;
		}
	}
});
</script>
