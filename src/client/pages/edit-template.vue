<template>
<kw-container>
	<template #title>
		<fa v-if="isEdit" :icon="faEdit" class="icon"/>
		<fa v-else :icon="faPlus" class="icon"/>
		<span v-if="isEdit" v-t="{ path: '_templateEdit.editTemplate', args: { template: template.name } }"></span>
		<span v-else v-t="'_templateEdit.createTemplate'"></span>
	</template>

	<kw-input v-model="name"><span v-t="'_templateEdit.name'"></span></kw-input>
	<kw-textarea v-model="attributes"><span v-t="'_templateEdit.attributes'"></span></kw-textarea>
	<kw-input v-if="isEdit" v-model="commitMessage"><span v-t="'_templateEdit.commitMessage'"></span></kw-input>
	<kw-button v-if="isEdit" v-t="'update'" @click="submit()"></kw-button>
	<kw-button v-else v-t="'create'" @click="submit()"></kw-button>
</kw-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import KwContainer from '../components/container.vue';
import KwInput from '../components/input.vue';
import KwTextarea from '../components/textarea.vue';
import KwButton from '../components/button.vue';

export default Vue.extend({
	components: {
		KwContainer, KwInput, KwTextarea, KwButton
	},

	props: {
		templateId: {
			type: String,
			required: false
		}
	},

	data() {
		return {
			template: null,
			name: '',
			attributes: '',
			commitMessage: '',
			faEdit, faPlus,
		};
	},

	computed: {
		isEdit(): boolean {
			return this.template != null;
		}
	},

	watch: {
		templateId() {
			this.fetch();
		}
	},

	created() {
		this.fetch();
	},

	methods: {
		fetch() {
			if (this.templateId == null) return;
			this.$root.api('templates/show', {
				id: this.templateId
			}).then(template => {
				this.template = template;
				this.name = template.name;
				this.attributes = template.attributes.join('\n');
			});
		},

		submit() {
			this.$root.api(this.isEdit ? 'templates/update' : 'templates/create', {
				id: this.isEdit ? this.templateId : null,
				name: this.name,
				attributes: this.attributes.split('\n'),
				commit: this.commitMessage || null
			}).then(template => {
				this.$router.push(`/${this.name}`);
			});
		}
	}
});
</script>
