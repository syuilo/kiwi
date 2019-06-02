<template>
<div class="ui-container" :class="{ fit }">
	<header>
		<h1><slot name="title"></slot></h1>
	</header>

	<div>
		<slot></slot>
	</div>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
	props: {
		fit: {
			type: Boolean,
			required: false
		}
	}
});
</script>

<style lang="scss" scoped>
.ui-container {
	color: #54514e;
	background: #fff;
	overflow: hidden;

	> header {
		padding: 32px;
		color: #92827c;
		border-bottom: solid 1px #eee;

		> h1 {
			font-size: 1.2em;
			margin: 0;

			> .icon {
				margin-right: 8px;
			}
		}
	}

	&:not(.fit) {
		> div {
			padding: 32px;
		}
	}
}
</style>
