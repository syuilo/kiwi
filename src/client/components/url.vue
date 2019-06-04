<template>
<span @mouseover="onHover()" @mouseleave="onLeave()">
	<component :is="hasRoute ? 'router-link' : 'a'" class="url" :[attr]="url" :target="target" :title="title">
		<slot></slot>
		<fa :icon="faExternalLinkSquareAlt" v-if="target === '_blank'" class="icon"/>
	</component>
</span>
</template>

<script lang="ts">
import Vue from 'vue';
import { faExternalLinkSquareAlt } from '@fortawesome/free-solid-svg-icons';
import { url as local } from '../env';
import Preiew from './popup-preview.vue';

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
			preview: null as any,
			closePreviewTimer: null as any,
			faExternalLinkSquareAlt
		};
	},
	beforeDestroy() {
		this.closePreview();
	},
	methods: {
		onHover() {
			if (this.closePreviewTimer) clearTimeout(this.closePreviewTimer);
			if (!this.hasRoute || this.preview) return;
			this.preview = new Preiew({
				parent: this,
				propsData: {
					path: this.url
				}
			}).$mount();
			document.body.appendChild(this.preview.$el);
		},
		onLeave() {
			this.closePreviewTimer = setTimeout(this.closePreview, 500);
		},
		closePreview() {
			if (this.preview) {
				this.preview.$destroy();
				document.body.removeChild(this.preview.$el);
				this.preview = null;
			}
		}
	}
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
