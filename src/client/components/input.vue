<template>
<label class="ui-input">
	<span class="label"><slot></slot></span>
	<input v-if="debounce" v-debounce="500" v-model.lazy="v" :type="type" :pattern="pattern"/>
	<input v-else v-model="v" :type="type" :pattern="pattern"/>
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
		type: {
			required: false
		},
		pattern: {
			required: false
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

		> * {
			margin: 0;
		}
	}

	> input {
		width: 100%;
		font-size: 16px;
		padding: 8px;
		box-sizing: border-box;
		border: solid 1px #ddd;
		border-radius: 4px;
	}

	> .info {
		font-size: 80%;
		opacity: 0.7;
	}
}
</style>
