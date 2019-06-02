<template>
<component :is="hasRoute ? 'router-link' : 'a'" class="url" :[attr]="url" :target="target" :title="title">
	<slot></slot>
	<fa :icon="faExternalLinkSquareAlt" v-if="target === '_blank'" class="icon"/>
</component>
</template>

<script lang="ts">
import Vue from 'vue';
import { faExternalLinkSquareAlt } from '@fortawesome/free-solid-svg-icons';
import { url as local } from '../env';

export default Vue.extend({
	props: {
		url: {
			type: String,
			required: true
		},
		title: {
			type: String,
			required: false
		}
	},
	data() {
		const isExternal = this.url.startsWith('http://') || this.url.startsWith('https://');
		const isSelf = !isExternal;
		const hasRoute = isSelf;
		return {
			local,
			self: isSelf,
			hasRoute: hasRoute,
			attr: hasRoute ? 'to' : 'href',
			target: hasRoute ? null : '_blank',
			faExternalLinkSquareAlt
		};
	},
});
</script>

<style lang="scss" scoped>
.url {
	word-break: break-all;
	text-decoration: none;

	&:hover {
		text-decoration: underline;
	}

	> .icon {
		padding-left: 2px;
		font-size: .9em;
		font-weight: 400;
		font-style: normal;
	}
}
</style>
