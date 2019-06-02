<template>
<kw-container :fit="true">
	<template #title>
		<fa :icon="faFileImage" class="icon"/><span v-t="'files'"></span>
	</template>

	<div style="overflow: auto;">
		<table class="kiwi">
			<thead>
				<tr>
					<th><fa :icon="faClock"/> {{ $t('_files._file.date') }}</th>
					<th>{{ $t('_files._file.name') }}</th>
					<th>{{ $t('_files._file.size') }}</th>
					<th>{{ $t('_files._file.type') }}</th>
					<th>{{ $t('_files._file.comment') }}</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="file in pager.items">
					<td :title="new Date(file.updatedAt).toLocaleString()"><timeago :datetime="file.updatedAt"></timeago></td>
					<td><router-link :to="'/:file/' + file.id">{{ file.name }}</router-link></td>
					<td>{{ file.size }}</td>
					<td>{{ file.type }}</td>
					<td>{{ file.comment }}</td>
				</tr>
			</tbody>
		</table>
	</div>

	<kw-button style="margin: 16px;" v-if="pager.more" @click="pager.fetch()">{{ $t('loadMore') }}</kw-button>
</kw-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { faHashtag } from '@fortawesome/free-solid-svg-icons';
import { faClock, faFileImage, faCommentAlt } from '@fortawesome/free-regular-svg-icons';
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
			pager: new Pager(this.$root, 'files'),
			faClock, faHashtag, faFileImage, faCommentAlt,
		};
	},
});
</script>
