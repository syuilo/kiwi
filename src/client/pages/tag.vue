<template>
<kw-container :fit="true">
	<template #title>
		<div style="float:left;">
			<fa :icon="faTag" class="icon"/><span>{{ tag }}</span>
		</div>
		<div style="float:right;">
			<router-link v-if="template == null" :to="'/:new-template/' + tag" style="text-decoration: none;"><span style="font-size: .7em;"><fa :icon="faStickyNote"/> {{ $t('_templateEdit.createTemplate') }}</span></router-link>
			<router-link v-else :to="'/:edit-template/' + template.id" style="text-decoration: none;"><span style="font-size: .7em;"><fa :icon="faStickyNote"/> {{ $t('_templateEdit.editTemplate') }}</span></router-link>
		</div>
		<div style="clear:both"></div>
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
					<td><router-link :to="'/' + page.path">{{ page.path }}</router-link></td>
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
import { faHashtag, faStickyNote, faTag } from '@fortawesome/free-solid-svg-icons';
import { faClock, faCommentAlt } from '@fortawesome/free-regular-svg-icons';
import KwContainer from '../components/container.vue';
import KwInput from '../components/input.vue';
import KwButton from '../components/button.vue';
import KwPermissions from '../components/permissions.vue';
import { Pager } from '../scripts/pager';

export default Vue.extend({
	components: {
		KwContainer, KwInput, KwButton, KwPermissions
	},

	props: {
		tag: {
			type: String,
			required: true
		}
	},

	data() {
		return {
			pager: new Pager(this.$root, 'pages/find-by-tag', () => ({
				tag: this.tag
			})),
			template: null,
			faClock, faHashtag, faStickyNote, faTag, faCommentAlt,
		};
	},

	watch: {
		tag() {
			this.fetchTemplate();
			this.pager.init();
		}
	},

	created() {
		this.fetchTemplate();
	},

	methods: {
		fetchTemplate() {
			this.$root.api('templates/show', {
				name: this.tag
			}).then(template => {
				this.template = template;
			}).catch(() => {
				this.template = null;
			});
		},
	}
});
</script>
