<template>
<kw-container>
	<template #title>
		<span v-t="'uploadFile'"></span>
	</template>

	<input type="file"/>
	<kw-button v-t="'_upload.upload'" @click="upload()"></kw-button>
</kw-container>
</template>

<script lang="ts">
import Vue from 'vue';
import KwContainer from './container.vue';
import KwButton from './button.vue';

export default Vue.extend({
	components: {
		KwContainer, KwButton
	},

	data() {
		return {
		};
	},

	methods: {
		upload() {

		}
	}
});
</script>
