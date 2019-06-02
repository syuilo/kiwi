<template>
<kw-container>
	<template #title>
		<fa :icon="faCog" class="icon"/><span v-t="'adminPage'"></span>
	</template>

	<router-link to="/:admin/wiki" v-t="'_adminPage.wikiSettings'"></router-link>
	<router-link to="/:admin/commits" v-t="'_adminPage.commits'"></router-link>
</kw-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import KwContainer from '../components/container.vue';

export default Vue.extend({
	components: {
		KwContainer
	},

	data() {
		return {
			faCog
		};
	},
});
</script>
