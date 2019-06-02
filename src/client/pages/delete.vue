<template>
<kw-container v-if="page">
	<template #title>
		<fa :icon="faTrashAlt" class="icon"/>
		<span v-t="{ path: '_pageDelete.deletePage', args: { page: page.title } }"></span>
	</template>

	<kw-input v-model="commitMessage"><span v-t="'_pageDelete.commitMessage'"></span></kw-input>
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
		pageId: {
			type: String,
			required: false
		}
	},

	data() {
		return {
			page: null,
			commitMessage: '',
			faTrashAlt,
		};
	},

	watch: {
		pageId() {
			this.fetch();
		}
	},

	created() {
		this.fetch();
	},

	methods: {
		fetch() {
			if (this.pageId == null) return;
			this.$root.api('pages/show', {
				id: this.pageId
			}).then(page => {
				this.page = page;
			});
		},

		submit() {
			this.$root.api('pages/delete', {
				id: this.pageId,
				commit: this.commitMessage || null
			}).then(page => {
				this.$router.push(`/`);
			});
		}
	}
});
</script>
