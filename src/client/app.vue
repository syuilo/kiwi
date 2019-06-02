<template>
<div>
	<header class="ui-header">
		<span class="title">Kiwi</span>
	</header>
	<nav class="ui-nav">
		<section>
			<p v-t="'menu'"></p>
			<ul>
				<li><router-link to="/"><fa :icon="faHome" class="icon"/><span v-t="'home'"></span></router-link></li>
				<template v-if="$root.isLoggedin">
					<li><router-link to="/:signout"><fa :icon="faPowerOff" class="icon"/><span v-t="'logout'"></span></router-link></li>
				</template>
				<template v-else>
					<li><router-link to="/:signin"><fa :icon="faSignInAlt" class="icon"/><span v-t="'login'"></span></router-link></li>
					<li><router-link to="/:signup"><fa :icon="faUserPlus" class="icon"/><span v-t="'signup'"></span></router-link></li>
				</template>
				<li><router-link to="/:new"><fa :icon="faPlus" class="icon"/><span v-t="'createPage'"></span></router-link></li>
				<li><router-link to="/:new-category"><fa :icon="faPlus" class="icon"/><span v-t="'createCategory'"></span></router-link></li>
				<li><router-link to="/:recently"><fa :icon="faHistory" class="icon"/><span v-t="'recentlyUpdatedPages'"></span></router-link></li>
			</ul>
		</section>
		<section>
			<p v-t="'categories'"></p>
		</section>
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
import { faHome, faPowerOff, faSignInAlt, faUserPlus, faPlus, faHistory } from '@fortawesome/free-solid-svg-icons';

export default Vue.extend({
	data() {
		return {
			faHome, faPowerOff, faSignInAlt, faUserPlus, faPlus, faHistory
		};
	}
});
</script>

<style lang="scss">
$header-height: 50px;
$nav-width: 250px;

html {
	font-family: sans-serif;
	background: #f7f7f7;
}

body {
	margin: 0;
}

.ui-header {
	position: fixed;
	z-index: 1001;
	top: 0;
	left: 0;
	width: 100%;
	line-height: $header-height;
	box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 8px;
	background: #a9b979;

	> .title {
		padding: 0 16px;
		color: #fff;
		font-weight: bold;
	}
}

.ui-nav {
	position: fixed;
	z-index: 1000;
	top: $header-height;
	left: 0;
	width: $nav-width;
	height: calc(100% - #{$header-height});
	background: #2f2f2f;
	font-size: 14px;

	> section {
		> p {
			margin: 0;
			padding: 8px;
			background: #212121;
			color: #9e9e9e;
			text-align: center;
		}

		> ul {
			margin: 0;
			padding: 12px 16px;
			list-style: none;

			> li {
				margin: 6px;

				> a {
					color: #ccc;
					text-decoration: none;

					&:hover {
						color: #fff;
					}

					> .icon {
						opacity: 0.7;
						margin-right: 6px;
						color: #bcbd88;
					}
				}
			}
		}
	}
}

.ui-main {
	margin: $header-height 0 0 $nav-width;
	max-width: 900px;
}

.ui-footer {
	margin: 0 0 0 $nav-width;
	padding: 32px;
	background: #eee;

	> small {
		opacity: 0.6;

		> a {
			color: inherit;
		}
	}
}
</style>
