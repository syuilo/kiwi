<template>
<div v-if="page">
	<header>
		<h1 class="title">{{ page.title }}</h1>
		<p class="subTitle">{{ page.subTitle }}</p>
	</header>
	<div class="content">
		<markdown :ast="page.ast"/>
	</div>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import Markdown from './markdown.ts';

export default Vue.extend({
	components: {
		Markdown
	},

	props: {
		name: {
			type: String,
			required: false,
		}
	},

	data() {
		return {
			page: null
		};
	},

	watch: {
		name() {
			this.fetch();
		}
	},

	created() {
		this.fetch();
	},

	methods: {
		fetch() {
			this.$root.api('pages/show', {
				name: this.name ? this.name : 'home'
			}).then(page => {
				this.page = page;
			});
		}
	}
});
</script>
