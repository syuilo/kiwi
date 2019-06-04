<template>
<label class="ui-textarea">
	<span class="label"><slot></slot></span>
	<textarea :value="value" @input="$emit('input', $event.target.value)" :required="required"></textarea>
	<span class="info"><slot name="info"></slot></span>
</label>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
	props: {
		value: {
			required: true
		},
		required: {
			required: false
		},
	}
});
</script>

<style lang="scss" scoped>
.ui-textarea {
	display: block;
	margin-bottom: 16px;

	> .label {
		display: block;
	}

	> textarea {
		min-width: 100%;
		max-width: 100%;
		min-height: 200px;
		font-size: 16px;
		padding: 8px;
		box-sizing: border-box;
		border: solid 1px #ddd;
		border-radius: 4px;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.07) inset;

		&:focus {
			outline: none;
			border-color: #ccc;
		}
	}
}
</style>
