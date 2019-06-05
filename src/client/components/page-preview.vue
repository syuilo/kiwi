<template>
<router-link class="preview" :to="'/' + page.path">
	<h1>{{ page.title }}</h1>
	<p>{{ page.subTitle }}</p>
</router-link>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
	props: {
		page: {
			required: true
		},
	},
});
</script>

<style lang="scss" scoped>
.preview {
	display: block;
	background: #fff;
	border: solid 1px #eee;
	color: inherit;
	text-decoration: none;
	padding: 16px;
	margin: 16px;

	> * {
		pointer-events: none;
	}

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
