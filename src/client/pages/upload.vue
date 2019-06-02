<template>
<kw-container>
	<template #title>
		<span v-t="'uploadFile'"></span>
	</template>

	<input ref="file" type="file" accept="*/*"/>
	<kw-button v-t="'_upload.upload'" @click="upload()"></kw-button>
</kw-container>
</template>

<script lang="ts">
import Vue from 'vue';
import KwContainer from '../components/container.vue';
import KwButton from '../components/button.vue';

export default Vue.extend({
	components: {
		KwContainer, KwButton
	},

	data() {
		return {
			progressMax: null,
			progressValue: null,
		};
	},

	methods: {
		upload() {
			const file = (this.$refs.file as any).files[0];

			const reader = new FileReader();
			reader.onload = e => {
				const data = new FormData();
				if (this.$root.isLoggedin) data.append('i', localStorage.getItem('i'));
				data.append('file', file);

				const xhr = new XMLHttpRequest();
				xhr.open('POST', '/_api/files/create', true);
				xhr.onload = (e: any) => {
					const res = JSON.parse(e.target.response);
					console.log(res);
					this.$router.push('/:file/' + res.id);
				};

				xhr.upload.onprogress = e => {
					if (e.lengthComputable) {
						this.progressMax = e.total;
						this.progressValue = e.loaded;
					}
				};

				xhr.send(data);
			};

			reader.readAsArrayBuffer(file);
		}
	}
});
</script>
