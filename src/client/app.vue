<template>
<div>
	<header class="ui-header">
		<router-link class="title" to="/">{{ $root.wiki ? $root.wiki.name : '' }}</router-link>
	</header>
	<nav class="ui-nav">
		<section>
			<p v-t="'menu'"></p>
			<ul>
				<li><router-link to="/"><fa :icon="faHome" class="icon" fixed-width/><span v-t="'home'"></span></router-link></li>
				<li><router-link to="/:recently"><fa :icon="faHistory" class="icon" fixed-width/><span v-t="'recentlyUpdatedPages'"></span></router-link></li>
			</ul>
			<ul v-if="$root.isLoggedin">
				<li><router-link to="/:new"><fa :icon="faPlus" class="icon" fixed-width/><span v-t="'createPage'"></span></router-link></li>
				<li><router-link to="/:new-category"><fa :icon="faPlus" class="icon" fixed-width/><span v-t="'createCategory'"></span></router-link></li>
				<li><router-link to="/:upload"><fa :icon="faUpload" class="icon" fixed-width/><span v-t="'uploadFile'"></span></router-link></li>
			</ul>
			<ul v-if="$root.user && $root.user.isAdmin">
				<li><router-link to="/:admin"><fa :icon="faCog" class="icon" fixed-width/><span v-t="'adminPage'"></span></router-link></li>
			</ul>
			<ul>
				<template v-if="$root.isLoggedin">
					<li><router-link to="/:signout"><fa :icon="faPowerOff" class="icon" fixed-width/><span v-t="'logout'"></span></router-link></li>
				</template>
				<template v-else>
					<li><router-link to="/:signin"><fa :icon="faSignInAlt" class="icon" fixed-width/><span v-t="'login'"></span></router-link></li>
					<li><router-link to="/:signup"><fa :icon="faUserPlus" class="icon" fixed-width/><span v-t="'signup'"></span></router-link></li>
				</template>
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
import { faHome, faPowerOff, faSignInAlt, faUserPlus, faPlus, faHistory, faUpload, faCog } from '@fortawesome/free-solid-svg-icons';

export default Vue.extend({
	data() {
		return {
			faHome, faPowerOff, faSignInAlt, faUserPlus, faPlus, faHistory, faUpload, faCog
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

table.kiwi {
	width: 100%;
	max-width: 100%;
	overflow: auto;
	border-spacing: 0;
	border-collapse: collapse;
	font-size: 14px;

	thead {
		font-weight: bold;
		border-bottom: solid 2px #eee;

		tr {
			th {
				text-align: left;
			}
		}
	}

	tbody {
		tr {
			&:nth-child(odd) {
				background: #fbfbfb;
			}
		}
	}

	th, td {
		padding: 8px 16px;
		min-width: 128px;
	}
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
		text-decoration: none;
	}
}

.ui-nav {
	position: fixed;
	z-index: 1000;
	top: $header-height;
	left: 0;
	width: $nav-width;
	height: calc(100% - #{$header-height});
	background: #353432;
	font-size: 14px;

	> section {
		> p {
			margin: 0;
			padding: 8px 16px;
			background: #484641;
			color: #9e9e9e;
		}

		> ul {
			margin: 12px 0;
			padding: 0;
			list-style: none;

			> li {
				margin: 0;

				> a {
					display: block;
					padding: 4px 16px;
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
