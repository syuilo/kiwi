<template>
<button class="ui-button" @click="$emit('click')">
	<span><slot></slot></span>
</button>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({});
</script>

<style lang="scss" scoped>
.ui-button {
	display: block;
	border: none;
	border-radius: 0;
	background: #a9b979;
	color: #fff;
	padding: 8px 16px;
	cursor: pointer;
	user-select: none;

	> span {
		pointer-events: none;
		user-select: none;
	}
}
</style>
