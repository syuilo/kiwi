<template>
<div>
	<h1>New</h1>
	<label>
		<p v-t="'_newPage.title'"></p>
		<input v-model="title"/>
	</label>
	<label>
		<p v-t="'_newPage.subTitle'"></p>
		<input v-model="subTitle"/>
	</label>
	<label>
		<p v-t="'_newPage.url'"></p>
		<input v-model="name"/>
	</label>
	<textarea v-model="content"></textarea>
	<button v-t="'_newPage.create'" @click="submit()"></button>
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
