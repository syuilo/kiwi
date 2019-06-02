<template>
<kw-container>
	<template #title>
		<span v-if="isEdit" v-t="{ path: '_pageEdit.editPage', args: { page: page.title } }"></span>
		<span v-else v-t="'_pageEdit.createPage'"></span>
	</template>

	<kw-input v-model="title"><span v-t="'_pageEdit.title'"></span></kw-input>
	<kw-input v-model="subTitle"><span v-t="'_pageEdit.subTitle'"></span></kw-input>
	<kw-input v-model="name"><span v-t="'_pageEdit.url'"></span>
		<template #info>{{ local }}/{{ name }}</template>
	</kw-input>
	<kw-textarea v-model="content"><span v-t="'_pageEdit.content'"></span></kw-textarea>
	<kw-input v-if="isEdit" v-model="commitMessage"><span v-t="'_pageEdit.commitMessage'"></span></kw-input>
	<kw-button v-if="isEdit" v-t="'update'" @click="submit()"></kw-button>
	<kw-button v-else v-t="'create'" @click="submit()"></kw-button>
</kw-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { url as local } from '../env';
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
			local,
			page: null,
			title: '',
			subTitle: '',
			name: '',
			content: '',
			commitMessage: '',
		};
	},

	computed: {
		isEdit(): boolean {
			return this.page != null;
		}
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
				this.title = page.title;
				this.subTitle = page.subTitle;
				this.name = page.name;
				this.content = page.content;
			});
		},

		submit() {
			this.$root.api(this.isEdit ? 'pages/update' : 'pages/create', {
				id: this.isEdit ? this.pageId : null,
				name: this.name,
				title: this.title,
				subTitle: this.subTitle,
				content: this.content,
				commit: this.commitMessage || null
			}).then(page => {
				this.$router.push(`/${this.name}`);
			});
		}
	}
});
</script>
