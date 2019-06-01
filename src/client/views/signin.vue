<template>
<div>
	<h1 v-t="'login'"></h1>
	<label>
		<p v-t="'_login.name'"></p>
		<input v-model="name"/>
	</label>
	<label>
		<p v-t="'_login.password'"></p>
		<input type="password" v-model="password"/>
	</label>
	<button v-t="'_login.login'" @click="submit()"></button>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
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
