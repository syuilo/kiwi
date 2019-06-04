<template>
<section>
	<component :is="'h' + depth" :id="identifier" class="header">
		<div class="title"><a :href="'#' + identifier" aria-hidden="true"><fa :icon="faLink" size="xs" style="padding-right: 8px;"/></a><slot name="heading"></slot></div>
		<button @click="open = !open"><fa :icon="open ? faChevronUp : faChevronDown"/></button>
	</component>
	<div v-show="open">
		<slot></slot>
	</div>
</section>
</template>

<script lang="ts">
import Vue from 'vue';
import { faLink, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

export default Vue.extend({
	props: {
		identifier: {
			type: String,
			required: true
		},
		depth: {
			type: Number,
			required: true
		},
	},

	data() {
		return {
			open: true,
			faLink, faChevronUp, faChevronDown,
		};
	}
});
</script>

<style lang="scss" scoped>
section {
	clear: both;

	> .header {
		position: relative;

		> .title {
			> a {
				color: inherit;
				opacity: 0.5;

				&:hover {
					opacity: 1;
				}
			}
		}

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
