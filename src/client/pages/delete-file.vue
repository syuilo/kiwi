<template>
<kw-container v-if="file">
	<template #title>
		<fa :icon="faTrashAlt" class="icon"/>
		<span v-t="{ path: '_fileDelete.deleteFile', args: { file: file.name } }"></span>
	</template>

	<kw-input v-model="commitMessage"><span v-t="'_fileDelete.commitMessage'"></span></kw-input>
	<kw-button v-t="'delete'" @click="submit()"></kw-button>
</kw-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import KwContainer from '../components/container.vue';
import KwInput from '../components/input.vue';
import KwTextarea from '../components/textarea.vue';
import KwButton from '../components/button.vue';

export default Vue.extend({
	components: {
		KwContainer, KwInput, KwTextarea, KwButton
	},

	props: {
		fileId: {
			type: String,
			required: false
		}
	},

	data() {
		return {
			file: null,
			commitMessage: '',
			faTrashAlt,
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
			if (this.fileId == null) return;
			this.$root.api('files/show', {
				id: this.fileId
			}).then(file => {
				this.file = file;
			});
		},

		submit() {
			this.$root.api('files/delete', {
				id: this.fileId,
				commit: this.commitMessage || null
			}).then(file => {
				this.$router.push(`/`);
			});
		}
	}
});
</script>
