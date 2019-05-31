<template>
<div>
	<header>Kiwi</header>
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
