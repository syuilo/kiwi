<template>
<div class="image">
	<img :src="url" :title="title" :alt="alt"/>
</div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
	props: {
		url: {
			type: String,
			required: true
		},
		title: {
			type: String,
			required: false
		},
		alt: {
			type: String,
			required: false
		}
	},
});
</script>

<style lang="scss" scoped>
.image {
	> img {
		max-width: 100%;
		max-height: 200px;
	}
}
</style>
