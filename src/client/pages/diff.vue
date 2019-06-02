<template>
<kw-container>
	<template #title>
		<fa :icon="faPencilAlt" class="icon"/>#{{ commitId }}
	</template>

	<div v-html="diffsHtml"/>
</kw-container>
</template>

<script lang="ts">
import Vue from 'vue';
import * as Diff from 'diff';
import { Diff2Html } from 'diff2html';
import 'diff2html/dist/diff2html.min.css';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import KwContainer from '../components/container.vue';

export default Vue.extend({
	components: {
		KwContainer
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
		}
	}
});
</script>
