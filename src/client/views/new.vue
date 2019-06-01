<template>
<div>
	<h1>New</h1>
	<input v-model="title"/>
	<input v-model="subTitle"/>
	<input v-model="name"/>
	<textarea v-model="content"></textarea>
	<button v-t="'_new-page.create'" @click="submit()"></button>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
	data() {
		return {
			title: '',
			subTitle: '',
			name: '',
			content: '',
		};
	},

	methods: {
		submit() {
			this.$root.api('pages/create', {
				name: this.name,
				title: this.title,
				subTitle: this.subTitle,
				content: this.content,
			}).then(page => {
				console.log(page);
			});
		}
	}
});
</script>
