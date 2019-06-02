<template>
<kw-container :fit="true">
	<template #title>
		<fa :icon="faCog" class="icon"/><span v-t="'_adminPage.commits'"></span>
	</template>

	<div style="overflow: auto;">
		<table class="kiwi">
			<thead>
				<tr>
					<th v-t="'_adminPage._commits.date'"></th>
					<th v-t="'_adminPage._commits.id'"></th>
					<th v-t="'_adminPage._commits.user'"></th>
					<th v-t="'_adminPage._commits.action'"></th>
					<th v-t="'_adminPage._commits.type'"></th>
					<th v-t="'_adminPage._commits.message'"></th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="commit in commits">
					<td class="lastUpdated" :title="new Date(commit.createdAt).toLocaleString()"><timeago :datetime="commit.createdAt"></timeago></td>
					<td><router-link :to="'/:diff/' + commit.id">{{ commit.id }}</router-link></td>
					<td>{{ commit.user.name }}</td>
					<td v-t="'_adminPage._commits._commitActions.' + commit.action"></td>
					<td v-t="'_adminPage._commits._commitTypes.' + commit.type"></td>
					<td>{{ commit.message }}</td>
				</tr>
			</tbody>
		</table>
	</div>
</kw-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { faCog } from '@fortawesome/free-solid-svg-icons';
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
			commits: [],
			faCog
		};
	},

	created() {
		this.$root.api('commits').then(commits => {
			this.commits = commits;
		});
	},
});
</script>
