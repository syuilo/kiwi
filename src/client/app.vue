<template>
<div>
	<header class="ui-header">Kiwi</header>
	<nav>
		<ul>
			<li><router-link to="/:new" v-t="'create-page'"></router-link></li>
		</ul>
	</nav>
	<main>
		<router-view></router-view>
	</main>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({});
</script>

<style lang="scss">
.ui-header {
	position: fixed;
	z-index: 1000;
	top: 0;
	left: 0;
	width: 100%;
	line-height: 48px;
	box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 8px;
}
</style>
