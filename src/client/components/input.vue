<template>
<label class="ui-input">
	<span class="label"><slot></slot></span>
	<input v-if="debounce" v-debounce="500" v-model.lazy="v"/>
	<input v-else v-model="v"/>
	<span class="info"><slot name="info"></slot></span>
</label>
</template>

<script lang="ts">
import Vue from 'vue';
import debounce from 'v-debounce';

export default Vue.extend({
	directives: {
		debounce
	},
	props: {
		value: {
			required: true
		},
		debounce: {
			required: false
		},
	},
	data() {
		return {
			v: this.value,
		};
	},
	watch: {
		value(v) {
			this.v = v;
		},
		v(v) {
			if (this.type === 'number') {
				this.$emit('input', parseInt(v, 10));
			} else {
				this.$emit('input', v);
			}
		}
	},
});
</script>

<style lang="scss" scoped>
.ui-input {
	display: block;
	margin-bottom: 16px;

	> .label {
		display: block;
	}

	> input {
		width: 100%;
		font-size: 16px;
		padding: 8px;
		box-sizing: border-box;
		border: solid 1px #ddd;
		border-radius: 4px;
	}
}
</style>
