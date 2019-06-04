import Vue from 'vue';
import KwMd from './markdown';

export default Vue.component('kw-defs', {
	props: {
		ast: {
			required: true
		},
	},

	render(createElement) {
		return createElement('ol', this.ast.map(token => createElement(KwMd, {
			props: {
				tag: 'li',
				id: `#cite_note-${token.identifier}`,
				ast: token.children,
			},
		})));
	}
});
