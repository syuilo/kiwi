<template>
<kw-container :fit="true">
	<template #title>
		<fa :icon="faBook" class="icon"/><span v-t="'recentlyUpdatedPages'"></span>
	</template>

	<div style="overflow: auto;">
		<table class="kiwi">
			<thead>
				<tr>
					<th><fa :icon="faClock"/> {{ $t('_pages._page.date') }}</th>
					<th>{{ $t('_pages._page.path') }}</th>
					<th>{{ $t('_pages._page.title') }}</th>
					<th>{{ $t('_pages._page.subTitle') }}</th>
					<th>{{ $t('_pages._page.comment') }}</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="page in pager.items">
					<td :title="new Date(page.updatedAt).toLocaleString()"><timeago :datetime="page.updatedAt"></timeago></td>
					<td><router-link :to="'/' + page.name">{{ page.name }}</router-link></td>
					<td>{{ page.title }}</td>
					<td>{{ page.subTitle }}</td>
					<td>{{ page.commitMessage }}</td>
				</tr>
			</tbody>
		</table>
	</div>
</kw-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { faHashtag, faBook } from '@fortawesome/free-solid-svg-icons';
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

	data() {
		return {
			pager: new Pager(this.$root, 'pages/recently'),
			faClock, faHashtag, faBook, faCommentAlt,
		};
	},
});
</script>
