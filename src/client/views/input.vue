<template>
<label class="ui-input">
	<span class="label"><slot></slot></span>
	<input :value="value" @input="$emit('input', $event.target.value)"/>
	<span class="info"><slot name="info"></slot></span>
</label>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
	props: {
		value: {
			required: true
		}
	}
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
