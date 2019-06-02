<template>
<kw-container>
	<template #title>
		<span v-t="'signup'"></span>
	</template>

	<label>
		<p v-t="'_signup.name'"></p>
		<input v-model="name"/>
	</label>
	<label>
		<p v-t="'_signup.password'"></p>
		<input v-model="password"/>
	</label>
	<button v-t="'_signup.signup'" @click="submit()"></button>
</kw-container>
</template>

<script lang="ts">
import Vue from 'vue';
import KwContainer from '../components/container.vue';

export default Vue.extend({
	components: {
		KwContainer
	},

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
