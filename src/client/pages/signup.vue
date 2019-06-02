<template>
<div>
	<h1 v-t="'signup'"></h1>
	<label>
		<p v-t="'_signup.name'"></p>
		<input v-model="name"/>
	</label>
	<label>
		<p v-t="'_signup.password'"></p>
		<input v-model="password"/>
	</label>
	<button v-t="'_signup.signup'" @click="submit()"></button>
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
			this.$root.api('signup', {
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
