<template>
<span class="ref">
	<router-link :to="`#cite_note-${identifier}`">{{ label }}</router-link>
</span>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
	props: {
		identifier: {
			type: String,
			required: true
		},
		label: {
			type: String,
			required: true
		}
	},
});
</script>

<style lang="scss" scoped>
.ref {
	vertical-align: super;
	font-size: 70%;
}
</style>
