<template>
<kw-container v-if="commit">
	<template #title>
		<fa :icon="faPencilAlt" class="icon"/>#{{ commitId }}
	</template>

	<div v-if="commit.action === 'update'" v-html="diffsHtml"/>

	<template v-if="$root.user && $root.user.isAdmin">
		<vue-recaptcha v-if="$root.wiki && $root.wiki.recaptchaSiteKey" :sitekey="$root.wiki.recaptchaSiteKey" @verify="onVerify"></vue-recaptcha>
		<kw-button @click="revert()">{{ $t('revert') }}</kw-button>
	</template>
</kw-container>
</template>

<script lang="ts">
import Vue from 'vue';
import * as Diff from 'diff';
import { Diff2Html } from 'diff2html';
import 'diff2html/dist/diff2html.min.css';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import KwContainer from '../components/container.vue';
import KwButton from '../components/button.vue';

export default Vue.extend({
	components: {
		KwContainer, KwButton
	},

	props: {
		commitId: {
			type: String,
			required: true,
		}
	},

	data() {
		return {
			commit: null,
			prev: null,
			diffs: null,
			recaptcha: null,
			faPencilAlt,
		};
	},

	computed: {
		diffsHtml() {
			if (this.diffs == null) return null;
			return Diff2Html.getPrettyHtml(this.diffs, {
				inputFormat: 'diff',
				showFiles: false,
				matching: 'lines',
				outputFormat: 'line-by-line'
			});
		}
	},

	watch: {
		commitId() {
			this.fetch();
		}
	},

	created() {
		this.fetch();
	},

	methods: {
		fetch() {
			Promise.all([
				this.$root.api('commits/show', {
					id: parseInt(this.commitId, 10)
				}),
				this.$root.api('commits/prev', {
					id: parseInt(this.commitId, 10)
				})
			]).then(([commit, prev]) => {
				this.commit = commit;
				this.prev = prev;

				if (commit.action === 'update') {
					this.diffs = Diff.createTwoFilesPatch(prev.data.name, commit.data.name, prev.data.content, commit.data.content, '', '');
				}
			});
		},

		revert() {
			if (this.commit.action === 'update') {
				this.$root.api('pages/update', {
					id: this.commit.key,
					name: this.prev.data.name,
					title: this.prev.data.title,
					subTitle: this.prev.data.subTitle,
					content: this.prev.data.content,
					tags: this.prev.data.tags,
					category: this.prev.data.category,
					_recaptcha: this.recaptcha,
					commit: `This commit reverts #${this.commit.id}`
				}).then(page => {
					this.$router.push(`/${this.prev.data.name}`);
				});
			} else if (this.commit.action === 'delete') {
				this.$root.api('pages/create', {
					name: this.prev.data.name,
					title: this.prev.data.title,
					subTitle: this.prev.data.subTitle,
					content: this.prev.data.content,
					tags: this.prev.data.tags,
					category: this.prev.data.category,
					_recaptcha: this.recaptcha,
					commit: `This commit reverts #${this.commit.id}`
				}).then(page => {
					this.$router.push(`/${this.prev.data.name}`);
				});
			}
		},

		onVerify(res) {
			this.recaptcha = res;
		}
	}
});
</script>
