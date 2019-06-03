<template>
<kw-container :fit="true">
	<template #title>
		<fa :icon="faFolderOpen" class="icon"/><span>{{ category }}</span>
	</template>

	<div style="overflow: auto;">
		<table class="kiwi">
			<thead>
				<tr>
					<th><fa :icon="faClock"/> {{ $t('_pages._page.date') }}</th>
					<th>{{ $t('_pages._page.path') }}</th>
					<th>{{ $t('_pages._page.title') }}</th>
					<th>{{ $t('_pages._page.subTitle') }}</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="page in pager.items">
					<td :title="new Date(page.updatedAt).toLocaleString()"><timeago :datetime="page.updatedAt"></timeago></td>
					<td><router-link :to="'/' + page.name">{{ page.name }}</router-link></td>
					<td>{{ page.title }}</td>
					<td>{{ page.subTitle }}</td>
				</tr>
			</tbody>
		</table>
	</div>

	<kw-button style="margin: 16px;" v-if="pager.more" @click="pager.fetch()">{{ $t('loadMore') }}</kw-button>
</kw-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { faClock, faCommentAlt } from '@fortawesome/free-regular-svg-icons';
import KwContainer from '../components/container.vue';
import KwInput from '../components/input.vue';
import KwTextarea from '../components/textarea.vue';
import KwButton from '../components/button.vue';
import KwPermissions from '../components/permissions.vue';
import { Pager } from '../scripts/pager';

export default Vue.extend({
	components: {
		KwContainer, KwInput, KwButton, KwPermissions
	},

	props: {
		category: {
			type: String,
			required: true
		}
	},

	data() {
		return {
			pager: new Pager(this.$root, 'pages/find-by-category', () => ({
				category: this.category
			})),
			faClock, faFolderOpen, faCommentAlt,
		};
	},

	watch: {
		category() {
			this.pager.init();
		}
	}
});
</script>
