<template>
<kw-container v-if="wiki">
	<template #title>
		<fa :icon="faCog" class="icon"/><span v-t="'_adminPage.wikiSettings'"></span>
	</template>

	<kw-input v-model="name"><span v-t="'_adminPage._wikiSettings.wikiName'"></span></kw-input>
	<kw-input v-model="description"><span v-t="'_adminPage._wikiSettings.wikiDescription'"></span></kw-input>
	<kw-input v-model="logoUrl" type="url"><span v-t="'_adminPage._wikiSettings.wikiLogoUrl'"></span></kw-input>

	<span v-t="'_adminPage._wikiSettings.defaultPermissions'"></span>
	<kw-permissions v-model="defaultPermissions"/>

	<kw-input v-model="recaptchaSiteKey"><span v-t="'_adminPage._wikiSettings.recaptchaSiteKey'"></span></kw-input>
	<kw-input v-model="recaptchaSecretKey"><span v-t="'_adminPage._wikiSettings.recaptchaSecretKey'"></span></kw-input>

	<kw-textarea v-model="customHtml"><span v-t="'_adminPage._wikiSettings.customHtml'"></span></kw-textarea>

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
		KwContainer, KwInput, KwTextarea, KwButton, KwPermissions
	},

	data() {
		return {
			wiki: null,
			name: '',
			description: '',
			logoUrl: '',
			customHtml: '',
			defaultPermissions: [],
			recaptchaSiteKey: '',
			recaptchaSecretKey: '',
			faCog
		};
	},

	created() {
		this.$root.api('wiki').then(wiki => {
			this.wiki = wiki;
			this.name = wiki.name;
			this.description = wiki.description;
			this.logoUrl = wiki.logoUrl;
			this.customHtml = wiki.customHtml;
			this.defaultPermissions = wiki.defaultPermissions;
			this.recaptchaSiteKey = wiki.recaptchaSiteKey;
			this.recaptchaSecretKey = wiki.recaptchaSecretKey;
		});
	},

	methods: {
		update() {
			this.$root.api('wiki/update', {
				name: this.name,
				description: this.description,
				logoUrl: this.logoUrl,
				customHtml: this.customHtml,
				defaultPermissions: this.defaultPermissions,
				recaptchaSiteKey: this.recaptchaSiteKey,
				recaptchaSecretKey: this.recaptchaSecretKey,
			}).then(wiki => {
				this.$root.wiki = wiki;
			});
		}
	}
});
</script>
