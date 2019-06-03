<template>
<div v-if="page" class="page">
	<header>
		<h1 class="title">{{ page.title }}</h1>
		<p class="subTitle">{{ page.subTitle }}</p>
	</header>
	<markdown :ast="page.ast" class="content"/>
	<ul class="tags" v-if="page.tags.length > 0">
		<li v-for="tag in page.tags"><router-link :to="'/:tags/' + tag">{{ tag }}</router-link></li>
	</ul>
	<footer>
		<router-link :to="`/:edit/${page.id}`"><fa :icon="faEdit"/><span v-t="'editThisPage'"></span></router-link>
		<router-link :to="`/:source/${page.id}`"><fa :icon="faCode"/><span v-t="'viewSource'"></span></router-link>
		<router-link :to="`/:history/${page.id}`"><fa :icon="faHistory"/><span v-t="'viewHistory'"></span></router-link>
		<span class="lastUpdated" :title="new Date(page.updatedAt).toLocaleString()"><span v-t="'lastUpdated'"></span>: <timeago :datetime="page.updatedAt"></timeago></span>
	</footer>
</div>
<kw-container v-else-if="notFound">
	<template #title>
		<fa :icon="faExclamationTriangle" class="icon"/><span v-t="'_notFound.notFound'"></span>
	</template>
</kw-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { faEdit, faCode, faHistory, faExclamationTriangle, faTag } from '@fortawesome/free-solid-svg-icons';
import Markdown from '../components/markdown';
import KwContainer from '../components/container.vue';
import Progress from '../scripts/progress';

export default Vue.extend({
	components: {
		Markdown, KwContainer
	},

	props: {
		name: {
			type: String,
			required: false,
		}
	},

	data() {
		return {
			page: null,
			notFound: false,
			faEdit, faCode, faHistory, faExclamationTriangle, faTag,
		};
	},

	watch: {
		name() {
			this.fetch();
		}
	},

	created() {
		this.fetch();
	},

	methods: {
		fetch() {
			Progress.start();
			this.page = null;
			this.$root.api('pages/show', {
				name: this.name ? this.name : 'home'
			}).then(page => {
				this.page = page;
				Progress.done();
			}).catch(e => {
				Progress.done();
				if (e.id === '1d5731c3-c4cd-4b32-a148-67c8fde1c181') {
					this.notFound = true;
				}
			});
		}
	}
});
</script>

<style lang="scss">
$margin: 48px;

.page {
	color: #54514e;
	background: #fff;
	overflow: hidden;

	> header {
		padding: 32px $margin;
		color: #92827c;
		border-bottom: solid 1px #eee;

		> .title {
			margin: 0;
		}

		> .subTitle {
			margin: 0;
			opacity: 0.7;
		}
	}

	> .content {
		padding: 16px 0;
		border-bottom: solid 2px #eee;

		> *:not(section) {
			margin-left: $margin;
			margin-right: $margin;
		}

		> section > *:not(.header) {
			margin-left: $margin;
			margin-right: $margin;
		}

		h1 {
			padding: 16px $margin;
			margin-bottom: 26px;
			font-size: 1.5em;
			font-weight: normal;
			border-bottom: solid 1px #eee;
		}

		h2 {
			font-weight: normal;
		}

		blockquote {
			border-left: solid 2px #e2ded7;
			padding: 8px 16px;
			margin: 0;
			color: #92827c;
		}
	}

	> .tags {
		display: block;
		margin: 0;
		padding: 32px $margin;
		list-style: none;
		border-bottom: solid 1px #eee;

		> li {
			display: inline-block;
			margin-right: 24px;

			> a {
				display: inline-block;
				position: relative;
				color: #fff;
				background: #a9b979;
				text-decoration: none;
				padding: 0 12px;
				margin-left: 8px;
				line-height: 32px;
				border-radius: 0 4px 4px 0;

				&:hover {
					background: #bdce8a;

					&:before {
						border-right-color: #bdce8a;
					}
				}

				&:before {
					content: "";
					display: block;
					position: absolute;
					left: -32px;
					top: 0;
					border-top: solid 16px transparent;
					border-right: solid 16px #a9b979;
					border-bottom: solid 16px transparent;
					border-left: solid 16px transparent;
				}

				&:after {
					content: "";
					display: block;
					position: absolute;
					left: -4px;
					top: 13px;
					width: 6px;
					height: 6px;
					background: #fff;
					border-radius: 100%;
				}
			}
		}
	}

	> footer {
		padding: 32px $margin;
		font-size: 14px;

		> * {
			margin-right: 28px;
		}

		a {
			color: inherit;
			text-decoration: none;

			&:hover {
				text-decoration: underline;
			}

			> *:first-child {
				margin-right: 4px;
			}
		}

		> .lastUpdated {
			opacity: 0.7;
		}
	}
}
</style>
