<template>
<kw-container>
	<template #title>
		<fa v-if="isEdit" :icon="faEdit" class="icon"/>
		<fa v-else :icon="faPlus" class="icon"/>
		<span v-if="isEdit" v-t="{ path: '_pageEdit.editPage', args: { page: page.title } }"></span>
		<span v-else v-t="'_pageEdit.createPage'"></span>
	</template>

	<form>
		<kw-input v-model="title"><span v-t="'_pageEdit.title'"></span></kw-input>
		<kw-input v-model="subTitle"><span v-t="'_pageEdit.subTitle'"></span></kw-input>
		<kw-input v-model="path" pattern="^[^\.]+$">
			<span v-t="'_pageEdit.url'"></span>
			<template #info>{{ local }}/{{ path }}</template>
		</kw-input>
		<kw-input v-model="category"><span v-t="'_pageEdit.category'"></span>
			<template #info>{{ $t('_pageEdit.categoryInfo') }}</template>
		</kw-input>
		<kw-textarea v-model="content"><span v-t="'_pageEdit.content'"></span></kw-textarea>
		<kw-input v-model="tags" :debounce="true"><span v-t="'_pageEdit.tags'"></span>
			<template #info>{{ $t('_pageEdit.tagsInfo') }}</template>
		</kw-input>
		<div v-for="template in templates">
			<kw-input v-for="attr in template.attributes" v-model="attributes[template.name + '.' + attr]" :key="template.name + '.' + attr"><span>{{ template.name }}: {{ attr }}</span></kw-input>
		</div>
		<kw-input v-if="isEdit" v-model="commitMessage"><span v-t="'_pageEdit.commitMessage'"></span></kw-input>
		<vue-recaptcha v-if="$root.wiki && $root.wiki.recaptchaSiteKey" :sitekey="$root.wiki.recaptchaSiteKey" @verify="onVerify"></vue-recaptcha>
		<kw-button v-if="isEdit" v-t="'update'" @click="submit()"></kw-button>
		<kw-button v-else v-t="'create'" @click="submit()"></kw-button>
	</form>
</kw-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
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
			path: '',
			content: '',
			tags: '',
			category: '',
			attributes: {},
			commitMessage: '',
			templates: [],
			recaptcha: null,
			faEdit, faPlus,
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
		},

		tags() {
			Promise.all(this.tags.split(' ').map(tag => this.$root.api('templates/show', { name: tag }).catch(() => null))).then(templates => {
				this.templates = templates.filter(x => x != null);
			});
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
				this.path = page.path;
				this.content = page.content;
				this.category = page.category;
				this.attributes = page.attributes;
				this.tags = page.tags.join(' ');
			});
		},

		submit() {
			this.$root.api(this.isEdit ? 'pages/update' : 'pages/create', {
				id: this.isEdit ? this.pageId : null,
				path: this.path,
				title: this.title,
				subTitle: this.subTitle,
				content: this.content,
				tags: this.tags.split(' '),
				category: this.category,
				attributes: this.attributes,
				_recaptcha: this.recaptcha,
				commit: this.commitMessage || undefined
			}).then(page => {
				this.$router.push(`/${this.path}`);
			});
		},

		onVerify(res) {
			this.recaptcha = res;
		}
	}
});
</script>
