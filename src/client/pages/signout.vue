<template>
<kw-container>
	<template #title>
		<span v-t="'logout'"></span>
	</template>

	<kw-button v-t="'logout'" @click="logout()"></kw-button>
</kw-container>
</template>

<script lang="ts">
import Vue from 'vue';
import KwContainer from '../components/container.vue';
import KwButton from '../components/button.vue';

export default Vue.extend({
	components: {
		KwContainer, KwButton
	},

	methods: {
		logout() {
			localStorage.removeItem('i');
			location.href = '/';
		}
	}
});
</script>
