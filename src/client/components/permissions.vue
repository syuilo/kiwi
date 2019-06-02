<template>
<div class="permissions">
	<label v-for="permission in permissions">
		<input type="checkbox" v-model="selecting[permission]" @change="onChange()"/><span v-t="'_permissions.' + permission"></span>
	</label>
</div>
</template>

<script lang="ts">
import Vue from 'vue';

const permissions = [
	'create:page',
	'update:page',
	'delete:page',
	'create:file',
	'update:file',
	'delete:file',
	'create:template',
	'update:template',
	'delete:template',
];

export default Vue.extend({
	props: {
		value: {
			required: true
		}
	},

	data() {
		const selecting = {};
		for (const p of permissions) {
			selecting[p] = this.value.includes(p);
		}

		return {
			selecting: selecting,
			permissions: permissions
		};
	},

	methods: {
		onChange() {
			this.$emit('input', Object.entries(this.selecting).filter(([k, v]) => v).map(([k, v]) => k));
		}
	},
});
</script>

<style lang="scss" scoped>
.permissions {
	> label {
		display: block;
	}
}
</style>
