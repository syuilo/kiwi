<template>
<kw-container>
	<template #title>
		<span v-t="'login'"></span>
	</template>

	<label>
		<p v-t="'_login.name'"></p>
		<input v-model="name"/>
	</label>
	<label>
		<p v-t="'_login.password'"></p>
		<input type="password" v-model="password"/>
	</label>
	<button v-t="'_login.login'" @click="submit()"></button>
</kw-container>
</template>

<script lang="ts">
import Vue from 'vue';
import KwContainer from '../components/container.vue';

export default Vue.extend({
	components: {
		KwContainer,
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
