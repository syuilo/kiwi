<template>
<kw-container>
	<template #title>
		<span v-t="'login'"></span>
	</template>

	<form @submit.prevent="submit()">
		<kw-input v-model="name" pattern="^[a-z0-9_]+$" required><p v-t="'_login.name'"></p></kw-input>
		<kw-input v-model="password" type="password" required><p v-t="'_login.password'"></p></kw-input>
		<kw-button v-t="'_login.login'" type="submit"></kw-button>
	</form>

	<template #footer>
		<span v-t="'_login.haveNoAccount'" style="margin-right: 16px;"></span><router-link to="/:signup" v-t="'signup'"></router-link>
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
		};
	},

	methods: {
		submit() {
			this.$root.api('signin', {
				name: this.name,
				password: this.password,
			}).then(({ token }) => {
				localStorage.setItem('i', token);
				location.href = '/';
			});
		}
	}
});
</script>
