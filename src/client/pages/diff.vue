<template>
<kw-container v-if="commit">
	<template #title>
		<fa :icon="faPencilAlt" class="icon"/>#{{ commitId }}
	</template>

	<div v-html="diffsHtml"/>

	<kw-button v-if="$root.user && $root.user.isAdmin && commit.action === 'update'" @click="revert()">{{ $t('revert') }}</kw-button>
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

				this.diffs = Diff.createTwoFilesPatch(prev.data.name, commit.data.name, prev.data.content, commit.data.content, '', '');
			});
		},

		revert() {
			this.$root.api('pages/update', {
				id: this.commit.key,
				name: this.prev.data.name,
				title: this.prev.data.title,
				subTitle: this.prev.data.subTitle,
				content: this.prev.data.content,
				commit: `This commit reverts #${this.commit.id}`
			}).then(page => {
				this.$router.push(`/${this.prev.data.name}`);
			});
		}
	}
});
</script>
