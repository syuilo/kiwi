<template>
<kw-container :fit="true">
	<template #title>
		<fa :icon="faHistory" class="icon"/><span v-t="'_adminPage.commits'"></span>
	</template>

	<div style="overflow: auto;">
		<table class="commits kiwi">
			<thead>
				<tr>
					<th><fa :icon="faClock"/> {{ $t('_adminPage._commits.date') }}</th>
					<th><fa :icon="faHashtag"/> {{ $t('_adminPage._commits.id') }}</th>
					<th><fa :icon="faUser"/> {{ $t('_adminPage._commits.user') }}</th>
					<th><fa :icon="faMousePointer"/> {{ $t('_adminPage._commits.action') }}</th>
					<th><fa :icon="faFile"/> {{ $t('_adminPage._commits.type') }}</th>
					<th><fa :icon="faCommentAlt"/> {{ $t('_adminPage._commits.message') }}</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="commit in pager.items">
					<td :title="new Date(commit.createdAt).toLocaleString()"><timeago :datetime="commit.createdAt"></timeago></td>
					<td><router-link :to="'/:diff/' + commit.id">{{ commit.id }}</router-link></td>
					<td>{{ commit.user.name }}</td>
					<td class="action" :class="commit.action" v-t="'_adminPage._commits._commitActions.' + commit.action"></td>
					<td v-t="'_adminPage._commits._commitTypes.' + commit.type"></td>
					<td>{{ commit.message }}</td>
				</tr>
			</tbody>
		</table>
	</div>

	<kw-button style="margin: 16px;" v-if="pager.more" @click="pager.fetch()">{{ $t('loadMore') }}</kw-button>
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
import { Pager } from '../scripts/pager';

export default Vue.extend({
	components: {
		KwContainer, KwInput, KwButton, KwPermissions
	},

	data() {
		return {
			pager: new Pager(this.$root, 'commits'),
			faHistory, faClock, faHashtag, faUser, faMousePointer, faFile, faCommentAlt,
		};
	},

});
</script>

<style lang="scss" scoped>
table.commits {
	td.action {
		&.create {
			color: #4a9fea;
		}

		&.update {
			color: #99b314;
		}

		&.delete {
			color: #b31414;
		}
	}
}
</style>
