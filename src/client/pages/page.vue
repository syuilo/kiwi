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
		<header><fa :icon="faBookOpen" class="icon"/>{{ $t('tableOfContents') }}</header>
		<div v-for="content in toc" class="item">
			<a :href="'#' + content.id" aria-hidden="true"><span :style="'padding-left: '+ content.depth * 8 + 'px;'">{{ content.text }}</span></a>
		</div>
	</div>
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
import { faEdit, faCode, faHistory, faExclamationTriangle, faTag, faAngleRight, faBookOpen } from '@fortawesome/free-solid-svg-icons';
import Markdown from '../components/markdown';
import KwContainer from '../components/container.vue';
import Progress from '../scripts/progress';

export default Vue.extend({
	components: {
		Markdown, KwContainer
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
			templates: [],
			notFound: false,
			faEdit, faCode, faHistory, faExclamationTriangle, faTag, faAngleRight, faBookOpen,
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
		}
	},

	created() {
		this.fetch();
	},

	methods: {
		fetch() {
			Progress.start();
			this.page = null;
			this.notFound = false;
			this.$root.api('pages/show', {
				path: this.path ? this.path : 'home'
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
		padding: 8px $margin;
		background: #eee;

		> * {
			margin-right: 16px;
			vertical-align: middle;
		}
	}

	> .infoboxes {
		> .infobox {
			margin: 16px $margin 16px 16px;
			border: solid 2px #eee;
			border-radius: 6px;
			overflow: hidden;
			float: right;
			font-size: 95%;

			> header {
				background: #eee;
				text-align: center;
				padding: 6px;
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
		margin: 16px 16px 16px $margin;
		border: solid 2px #eee;
		border-radius: 6px;
		overflow: hidden;
		display: table;
		font-size: 95%;
		float: left;

		> header {
			background: #eee;
			padding: 8px 12px;

			> .icon {
				margin-right: 6px;
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
