<template>
<kw-container v-if="wiki">
	<template #title>
		<fa :icon="faCog" class="icon"/><span v-t="'_adminPage.wikiSettings'"></span>
	</template>

	<kw-input v-model="name"><span v-t="'_adminPage._wikiSettings.wikiName'"></span></kw-input>
	<kw-input v-model="description"><span v-t="'_adminPage._wikiSettings.wikiDescription'"></span></kw-input>
	<span v-t="'_adminPage._wikiSettings.defaultPermissions'"></span>
	<kw-permissions v-model="defaultPermissions"/>
	<kw-button v-t="'update'" @click="update()"></kw-button>
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
			wiki: null,
			name: '',
			description: '',
			defaultPermissions: [],
			faCog
		};
	},

	created() {
		this.$root.api('wiki').then(wiki => {
			this.wiki = wiki;
			this.name = wiki.name;
			this.description = wiki.description;
			this.defaultPermissions = wiki.defaultPermissions;
		});
	},

	methods: {
		update() {
			this.$root.api('wiki/update', {
				name: this.name,
				description: this.description,
				defaultPermissions: this.defaultPermissions,
			}).then(wiki => {
				this.$root.wiki = wiki;
			});
		}
	}
});
</script>
