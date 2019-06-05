<template>
<kw-container>
	<template #title>
		<fa v-if="isEdit" :icon="faEdit" class="icon"/>
		<fa v-else :icon="faPlus" class="icon"/>
		<span v-if="isEdit" v-t="{ path: '_pageEdit.editPage', args: { page: page.title } }"></span>
		<span v-else v-t="'_pageEdit.createPage'"></span>
	</template>

	<form @submit.prevent="submit()">
		<kw-input v-model="title" required><span v-t="'_pageEdit.title'"></span></kw-input>
		<kw-input v-model="subTitle"><span v-t="'_pageEdit.subTitle'"></span></kw-input>
		<kw-input v-model="path" pattern="^[^:#]*$">
			<span v-t="'_pageEdit.url'"></span>
			<template #info>{{ local }}/{{ path.toLowerCase() }}</template>
		</kw-input>
		<kw-textarea v-model="content" required><span v-t="'_pageEdit.content'"></span></kw-textarea>
		<kw-input v-model="category" list="categories">
			<span v-t="'_pageEdit.category'"></span>
			<template #info>{{ $t('_pageEdit.categoryInfo') }}</template>
		</kw-input>
		<datalist id="categories">
			<option v-for="category in categories" :value="category"/>
		</datalist>
		<kw-input v-model="tags" :debounce="true"><span v-t="'_pageEdit.tags'"></span>
			<template #info>{{ $t('_pageEdit.tagsInfo') }}</template>
		</kw-input>
		<div v-for="template in templates">
			<kw-input v-for="attr in template.attributes" v-model="attributes[template.name + '.' + attr]" :key="template.name + '.' + attr"><span>{{ template.name }}: {{ attr }}</span></kw-input>
		</div>
		<kw-input v-if="isEdit" v-model="commitMessage"><span v-t="'_pageEdit.commitMessage'"></span></kw-input>
		<vue-recaptcha v-if="$root.wiki && $root.wiki.recaptchaSiteKey" :sitekey="$root.wiki.recaptchaSiteKey" @verify="onVerify"></vue-recaptcha>
		<kw-button v-if="isEdit" v-t="'update'" type="submit"></kw-button>
		<kw-button v-else v-t="'create'" type="submit"></kw-button>
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
		},
		initPath: {
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
			path: this.initPath || '',
			content: '',
			tags: '',
			category: '',
			attributes: {},
			commitMessage: '',
			templates: [],
			categories: [],
			recaptcha: null,
			submitting: false,
			ieEdited: false,
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
		},

		content(content) {
			if (this.isEdit) {
				if (this.page.content !== content) this.ieEdited = true;
			} else {
				this.ieEdited = true;
			}
		}
	},

	created() {
		if (!this.$root.isLoggedin) {
			this.$swal(this.$t('loginRequired')).then(() => {
				this.$router.push(`/:signin`);
			});
		}
		this.fetch();
		this.$root.api('categories').then(categories => {
			this.categories = categories;
		});
	},

	beforeMount() {
		window.addEventListener('beforeunload', this.pageLeaveHandler);
		this.$once('hook:destroyed', () => {
			window.removeEventListener('beforeunload', this.pageLeaveHandler);
		});
	},

	beforeRouteUpdate(to, from, next) {
		this.pageLeaveCheck(next);
	},

	beforeRouteLeave(to, from, next) {
		this.pageLeaveCheck(next);
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

		pageLeaveHandler(event) {
			if (this.submitting || !this.ieEdited) return;
			if (event.type === 'beforeunload') {
				event.returnValue = 'true';
			}
		},

		pageLeaveCheck(next) {
			if (this.submitting || !this.ieEdited) {
				next();
				return;
			}

			const pageUnsavedTitle = this.$t('_pageEdit._unsaved.title');
			const pageUnsavedText = this.$t('_pageEdit._unsaved.text');
			const pageUnsavedConfirm = this.$t('_pageEdit._unsaved.confirm');
			const pageUnsavedCancel = this.$t('_pageEdit._unsaved.cancel');

			(async () => {
				await this.$swal({
					title: pageUnsavedTitle,
					text: pageUnsavedText,
					icon: 'warning',
					buttons: [pageUnsavedCancel, pageUnsavedConfirm],
					closeOnClickOutside: true,
					dangerMode: true
				}).then(answer => {
					if (answer) {
						next();
					} else {
						next(false);
					}
				});
			})();
		},

		submit() {
			if (this.submitting) return;
			this.submitting = true;
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
