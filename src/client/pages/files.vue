<template>
<kw-container :fit="true">
	<template #title>
		<fa :icon="faHistory" class="icon"/><span v-t="'files'"></span>
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
				<tr v-for="file in files">
					<td :title="new Date(file.updatedAt).toLocaleString()"><timeago :datetime="file.updatedAt"></timeago></td>
					<td><router-link :to="'/:file/' + file.id">{{ file.name }}</router-link></td>
					<td>{{ file.size }}</td>
					<td>{{ file.type }}</td>
					<td>{{ file.comment }}</td>
				</tr>
			</tbody>
		</table>
	</div>
</kw-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { faHistory, faHashtag, faUser, faMousePointer } from '@fortawesome/free-solid-svg-icons';
import { faClock, faFile, faCommentAlt } from '@fortawesome/free-regular-svg-icons';
import KwContainer from '../components/container.vue';
import KwInput from '../components/input.vue';
import KwTextarea from '../components/textarea.vue';
import KwButton from '../components/button.vue';
import KwPermissions from '../components/permissions.vue';

export default Vue.extend({
	components: {
		KwContainer, KwInput, KwButton, KwPermissions
	},

	data() {
		return {
			files: [],
			faHistory, faClock, faHashtag, faUser, faMousePointer, faFile, faCommentAlt,
		};
	},

	created() {
		this.$root.api('files').then(files => {
			this.files = files;
		});
	},
});
</script>
