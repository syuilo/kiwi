<template>
<kw-container :fit="true">
	<template #title>
		<fa :icon="faSearch" class="icon"/>{{ query }}
	</template>

	<div v-if="pages.length > 0">
		<kw-page-preview v-for="page in pages" :page="page" :key="page.id"/>
	</div>
</kw-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import KwContainer from '../components/container.vue';
import KwPagePreview from '../components/page-preview.vue';

export default Vue.extend({
	components: {
		KwContainer, KwPagePreview,
	},

	props: {
		query: {
			type: String,
			required: true,
		}
	},

	data() {
		return {
			pages: [],
			faSearch,
		};
	},

	watch: {
		query() {
			this.search();
		}
	},

	created() {
		this.search();
	},

	methods: {
		search() {
			this.$root.api('pages/search', {
				query: this.query
			}).then(pages => {
				this.pages = pages;
			});
		}
	}
});
</script>
