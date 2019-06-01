<template>
<div>
	<header class="ui-header">Kiwi</header>
	<nav class="ui-nav">
		<ul>
			<li><router-link to="/:login" v-t="'login'"></router-link></li>
			<li><router-link to="/:new" v-t="'create-page'"></router-link></li>
			<li><router-link to="/:new-category" v-t="'create-category'"></router-link></li>
		</ul>
	</nav>
	<main class="ui-main">
		<router-view></router-view>
	</main>
	<footer class="ui-footer">
		<small>Powerd by <a href="https://github.com/syuilo/kiwi">Kiwi</a></small>
	</footer>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({});
</script>

<style lang="scss">
$header-height: 50px;
$nav-width: 250px;

.ui-header {
	position: fixed;
	z-index: 1001;
	top: 0;
	left: 0;
	width: 100%;
	line-height: $header-height;
	box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 8px;
	background: #fff;
}

.ui-nav {
	position: fixed;
	z-index: 1000;
	top: $header-height;
	left: 0;
	width: $nav-width;
	height: calc(100% - #{$header-height});
	background: #e2e2e2;
}

.ui-main {
	margin: $header-height 0 0 $nav-width;
	max-width: 850px;
}

.ui-footer {
	margin: $header-height 0 0 $nav-width;
}
</style>
