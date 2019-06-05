<template>
<div class="preview" v-if="page" :style="{ top: y + 'px', left: x + 'px' }">
	<h1>{{ page.title }}</h1>
	<p>{{ page.subTitle }}</p>
</div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
	props: {
		path: {
			type: String,
			required: true
		},
	},

	data() {
		return {
			page: null,
			x: 0,
			y: 0,
		};
	},

	created() {
		const rect = this.$parent.$el.getBoundingClientRect();
		this.x = rect.left;
		this.y = rect.top + this.$parent.$el.offsetHeight;

		this.$root.api('pages/show', {
			currentPath: this.$route.path.substr(1),
			path: this.path || '',
			detail: false
		}).then(page => {
			this.page = page;
		});
	}
});
</script>

<style lang="scss" scoped>
.preview {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 1000;
	background: #fff;
	box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
	pointer-events: none;
	padding: 16px;

	> h1 {
		font-size: 16px;
		margin: 0;
	}

	> p {
		margin: 0;
		opacity: 0.5;
		font-size: 15px;
	}
}
</style>
