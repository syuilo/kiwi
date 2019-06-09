<template>
<span v-html="html"></span>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
	props: {
		html: {
			type: String,
			required: true
		}
	},
});
</script>
