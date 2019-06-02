<template>
<section>
	<component :is="'h' + depth" class="header">
		<div class="title"><slot name="heading"></slot></div>
		<button @click="open = !open"><fa :icon="open ? faChevronUp : faChevronDown"/></button>
	</component>
	<div v-show="open">
		<slot></slot>
	</div>
</section>
</template>

<script lang="ts">
import Vue from 'vue';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

export default Vue.extend({
	props: {
		depth: {
			type: Number,
			required: true
		},
	},

	data() {
		return {
			open: true,
			faChevronUp, faChevronDown,
		};
	}
});
</script>

<style lang="scss" scoped>
section {
	> .header {
		position: relative;

		> button {
			position: absolute;
			top: 0;
			right: 0;
			height: 100%;
			width: 64px;
			border: none;
			background: none;
			cursor: pointer;
		}
	}
}
</style>
