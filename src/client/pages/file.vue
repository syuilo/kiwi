<template>
<kw-container v-if="file">
	<template #title>
		<span v-t="'file'"></span>: {{ file.name }}
	</template>

	<p>{{ local }}/files/{{ file.id }}</p>
</kw-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { url as local } from '../env';
import KwContainer from '../components/container.vue';

export default Vue.extend({
	components: {
		KwContainer
	},

	props: {
		fileId: {
			type: String,
			required: false,
		}
	},

	data() {
		return {
			local,
			file: null,
		};
	},

	watch: {
		fileId() {
			this.fetch();
		}
	},

	created() {
		this.fetch();
	},

	methods: {
		fetch() {
			this.$root.api('files/show', {
				id: parseInt(this.fileId, 10)
			}).then(file => {
				this.file = file;
			});
		}
	}
});
</script>
