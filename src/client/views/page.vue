<template>
<div v-if="page" class="page">
	<header>
		<h1 class="title">{{ page.title }}</h1>
		<p class="subTitle">{{ page.subTitle }}</p>
	</header>
	<markdown :ast="page.ast" class="content"/>
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

<style lang="scss">
.page {
	color: #54514e;

	> header {
		padding: 32px;
		color: #92827c;
		border-bottom: solid 1px #eee;

		> .title {
			margin: 0;
		}

		> .subTitle {
			margin: 0;
			opacity: 0.7;
		}
	}

	> .content {
		> *:not(h1) {
			margin-left: 32px;
			margin-right: 32px;
		}

		h1 {
			padding: 16px 32px;
			margin-bottom: 26px;
			font-size: 1.5em;
			border-bottom: solid 1px #eee;
		}

		blockquote {
			border-left: solid 2px #e2ded7;
			padding: 8px 16px;
			color: #92827c;
		}
	}
}
</style>
