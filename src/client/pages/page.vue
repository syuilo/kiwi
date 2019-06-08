<template>
<div v-if="page" class="page">
	<header>
		<h1 class="title"><router-link :to="page.path">{{ page.title }}</router-link></h1>
		<p class="subTitle" v-if="page.subTitle.length > 0">{{ page.subTitle }}</p>
	</header>

	<div class="category" v-if="page.category">
		<span>{{ $t('category') }}:</span>
		<template v-for="(c, i) in page.category.split('/')">
			<fa v-if="i > 0" :icon="faAngleRight" class="icon"/>
			<router-link :to="'/:categories/' + page.category.split('/').slice(0, i + 1).join('/')">{{ c }}</router-link>
		</template>
	</div>

	<InArticleAdsense v-if="$root.wiki && $root.wiki.adClient"
		:data-ad-client="$root.wiki.adClient"
		:data-ad-slot="$root.wiki.adSlot1">
	</InArticleAdsense>

	<div class="infoboxes" v-if="templates.length > 0">
		<div v-for="template in templates" class="infobox">
			<header><router-link :to="'/:tags/' + template.name">{{ template.name }}</router-link></header>
			<dl v-for="attr in template.attributes">
				<dt>{{ attr }}</dt>
				<dd>{{ page.attributes[template.name + '.' + attr] }}</dd>
			</dl>
		</div>
	</div>

	<div class="toc" v-if="toc.length > 0">
		<header><fa :icon="faBookOpen" class="icon"/>{{ $t('tableOfContents') }}<button @click="tocOpen = !tocOpen"><fa :icon="tocOpen ? faChevronUp : faChevronDown"/></button></header>
		<div v-for="content in toc" class="item" v-show="tocOpen">
			<a :href="'#' + content.id" aria-hidden="true"><span :style="'padding-left: '+ content.depth * 8 + 'px;'">{{ content.text }}</span></a>
		</div>
	</div>

	<markdown :ast="page.ast" class="content"/>

	<InArticleAdsense v-if="$root.wiki && $root.wiki.adClient"
		:data-ad-client="$root.wiki.adClient"
		:data-ad-slot="$root.wiki.adSlot2">
	</InArticleAdsense>

	<ul class="tags" v-if="page.tags.length > 0">
		<li v-for="tag in page.tags"><router-link :to="'/:tags/' + tag">{{ tag }}</router-link></li>
	</ul>

	<footer>
		<router-link v-if="($root.user && $root.user.isAdmin) || !page.isLocked" :to="`/:edit/${page.id}`"><fa :icon="faEdit"/><span v-t="'editThisPage'"></span></router-link>
		<template v-if="$root.user && $root.user.isAdmin">
			<a @click="togglePin()"><fa :icon="faThumbtack"/><span v-t="page.isPinned ? 'unpinThisPage' : 'pinThisPage'"></span></a>
			<a @click="toggleLock()"><fa :icon="faLock"/><span v-t="page.isLocked ? 'unlockThisPage' : 'lockThisPage'"></span></a>
		</template>
		<router-link :to="`/:source/${page.id}`"><fa :icon="faCode"/><span v-t="'viewSource'"></span></router-link>
		<router-link :to="`/:history/${page.id}`"><fa :icon="faHistory"/><span v-t="'viewHistory'"></span></router-link>
		<span class="lastUpdated" :title="new Date(page.updatedAt).toLocaleString()"><span v-t="'lastUpdated'"></span>: <timeago :datetime="page.updatedAt"></timeago></span>
	</footer>

	<kw-defs :ast="page.defAst" class="defs"/>

	<ul class="links" v-if="links.length > 0">
		<li v-for="link in links">
			<router-link :to="'/' + link.path">
				<h1>{{ link.title }}</h1>
				<p>{{ link.subTitle }}</p>
			</router-link>
		</li>
	</ul>

	<div class="join-now" v-if="$root.wiki && !$root.isLoggedin && page.path === ''">
		<p v-t="{ path: 'joinNowText', args: { wiki: $root.wiki.name }}"></p>
		<router-link to="/:signup"><span v-t="'joinNow'"></span></router-link>
	</div>
</div>

<kw-container v-else-if="notFound">
	<template #title>
		<fa :icon="faExclamationTriangle" class="icon"/><span v-t="'_notFound.notFound'"></span>
	</template>

	<router-link :to="'/:new/' + path" v-t="'_notFound.createThatPage'"></router-link>
</kw-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { faEdit, faCode, faHistory, faExclamationTriangle, faTag, faAngleRight, faBookOpen, faThumbtack, faLock, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import Markdown from '../components/markdown';
import KwDefs from '../components/defs';
import KwContainer from '../components/container.vue';
import Progress from '../scripts/progress';

export default Vue.extend({
	components: {
		Markdown, KwDefs, KwContainer
	},

	props: {
		path: {
			type: String,
			required: false,
		}
	},

	data() {
		return {
			page: null,
			toc: [],
			tocOpen: true,
			templates: [],
			links: [],
			notFound: false,
			faEdit, faCode, faHistory, faExclamationTriangle, faTag, faAngleRight, faBookOpen, faThumbtack, faLock, faChevronUp, faChevronDown,
		};
	},

	watch: {
		path() {
			this.fetch();
		},

		page() {
			if (this.page == null) {
				this.toc = [];
				this.templates = [];
				this.links = [];
				return;
			}

			if (this.page.ast == null) {
				this.toc = [];
			} else {
				const flatHeadings = (nodes, depth) => {
					return nodes.reduce((acc, r) => {
						if (r.type === 'section') {
							acc.push({
								id: r.id,
								text: r.content,
								depth: depth
							});
							if (r.children && r.children.length) {
								acc = acc.concat(flatHeadings(r.children, depth + 1));
							}
						}
						return acc;
					}, []);
				};
				this.toc = flatHeadings(this.page.ast, 0);
			}

			if (this.page.tags.length == 0) {
				this.templates = [];
			} else {
				Promise.all(this.page.tags.map(tag => this.$root.api('templates/show', { name: tag }).catch(() => null))).then(templates => {
					this.templates = templates.filter(x => x != null);
				});
			}

			this.$root.api('pages/links', { id: this.page.id }).then(links => {
				this.links = links;
			});
		}
	},

	created() {
		this.fetch();
	},

	methods: {
		fetch() {
			Progress.start();
			this.$root.api('pages/show', {
				path: this.path || '',
				raw: false
			}).then(page => {
				this.notFound = false;
				this.page = page;
				Progress.done();
			}).catch(e => {
				Progress.done();
				this.page = null;
				if (e.id === '1d5731c3-c4cd-4b32-a148-67c8fde1c181') {
					this.notFound = true;
				}
			});
		},

		togglePin() {
			this.$root.api('pages/pin', {
				id: this.page.id,
				pinned: !this.page.isPinned
			}).then(page => {
				Vue.set(this.page, 'isPinned', !this.page.isPinned);
			});
		},

		toggleLock() {
			this.$root.api('pages/lock', {
				id: this.page.id,
				locked: !this.page.isLocked
			}).then(page => {
				Vue.set(this.page, 'isLocked', !this.page.isLocked);
			});
		},
	}
});
</script>

<style lang="scss">
@import '../style.scss';

.page {
	color: #54514e;
	background: #fff;
	overflow: hidden;

	--lrMargin: 48px;

	@include tab {
		--lrMargin: 32px;
	}

	@include sp {
		--lrMargin: 16px;
	}

	> header {
		padding: 32px var(--lrMargin);
		color: #92827c;
		border-bottom: solid 1px #eee;

		@include sp {
			padding: 16px var(--lrMargin);
		}

		> .title {
			margin: 0;

			> a {
				color: inherit;
				text-decoration: none;
			}
		}

		> .subTitle {
			margin: 0;
			opacity: 0.7;
		}
	}

	> .category {
		margin-top: -1px;
		padding: 8px var(--lrMargin);
		background: #eee;

		> * {
			margin-right: 16px;
			vertical-align: middle;
		}
	}

	> .infoboxes {
		> .infobox {
			margin: 16px var(--lrMargin) 16px 16px;
			border: solid 2px #eee;
			border-radius: 6px;
			overflow: hidden;
			float: right;
			font-size: 95%;

			> header {
				background: #eee;
				text-align: center;
				padding: 4px 6px 6px 6px;
			}

			> dl {
				padding: 0 8px;

				> dt, > dd {
					display: inline-block;
					margin: 0;
					word-break: break-all;
					vertical-align: middle;
				}

				> dt {
					width: 30%;
					font-weight: bold;
					text-align: center;
					padding-right: 8px;
					box-sizing: border-box;
				}

				> dd {
					width: 70%;
				}
			}
		}
	}

	> .toc {
		margin: 16px 16px 16px var(--lrMargin);
		border: solid 2px #eee;
		border-radius: 6px;
		overflow: hidden;
		display: table;
		font-size: 95%;
		float: left;
		min-width: 130px;

		@include mobile {
			display: block;
			float: none;
		}

		> header {
			position: relative;
			background: #eee;
			padding: 6px 12px 8px 12px;

			> .icon {
				margin-right: 6px;
			}

			> button {
				position: absolute;
				top: 0;
				right: 0;
				padding: 10px;
				border: none;
				background: none;
				cursor: pointer;
			}
		}

		> .item {
			margin: 8px 0;
			padding-left: 16px;
			padding-right: 16px;

			> a {
				color: inherit;
				text-decoration: none;

				&:hover {
					text-decoration: underline;
				}
			}
		}
	}

	> .content {
		padding: 16px 0;
		border-bottom: solid 2px #eee;

		&:after {
			content: "";
			display: block;
			clear: both;
		}

		> *:not(section) {
			margin-left: var(--lrMargin);
			margin-right: var(--lrMargin);
		}

		> section > *:not(.header) {
			margin-left: var(--lrMargin);
			margin-right: var(--lrMargin);
		}

		h1 {
			padding: 16px var(--lrMargin);
			margin-bottom: 26px;
			font-size: 1.5em;
			font-weight: normal;
			border-bottom: solid 1px #eee;

			@include sp {
				font-size: 1.25em;
			}
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
		padding: 32px var(--lrMargin);
		list-style: none;
		border-bottom: solid 1px #eee;

		@include sp {
			padding: 16px var(--lrMargin);
		}

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
		padding: 32px var(--lrMargin);
		font-size: 14px;

		@include sp {
			padding: 16px var(--lrMargin);
		}

		> * {
			margin-right: 28px;
		}

		a {
			color: inherit;
			text-decoration: none;
			cursor: pointer;

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

	> .defs {
		display: block;
		margin: 0;
		padding: 16px var(--lrMargin);
		background: #eee;
		border-bottom: solid 1px #ddd;
		font-size: 90%;

		&:empty {
			display: none;
		}

		> * {
			opacity: 0.7;
		}
	}

	> .links {
		display: block;
		margin: 0;
		padding: 32px var(--lrMargin);
		list-style: none;
		background: #eee;
		border-bottom: solid 1px #ddd;
		overflow: auto;
		white-space: nowrap;

		@include sp {
			padding: 16px var(--lrMargin);
		}

		> li {
			display: inline-block;
			background: #fff;
			border-radius: 6px;

			&:not(:last-child) {
				margin-right: 24px;
			}

			> a {
				display: inline-block;
				padding: 20px;
				color: inherit;
				text-decoration: none;

				> h1 {
					font-size: 16px;
					line-height: 16px;
					margin: 0 0 4px 0;
				}

				> p {
					margin: 0;
					opacity: 0.5;
					font-size: 14px;
					line-height: 14px;
				}
			}
		}
	}

	> .join-now {
		padding: 32px;
		text-align: center;
		background: #a9b979;
		color: #fff;

		> p {
			margin: 0 0 16px 0;
		}

		> a {
			display: inline-block;
			padding: 8px 14px;
			background: #fff;
			color: #a9b979;
			text-decoration: none;
		}
	}
}
</style>
