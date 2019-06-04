import Vue, { VNode } from 'vue';
import KwMd from './markdown';

export default Vue.component('kw-defs', {
	props: {
		ast: {
			required: true
		},
	},

	render(createElement) {
		const els: VNode[] = [];

		function x(tokens) {
			for (const token of tokens) {
				if (token.type === 'footnoteDefinition') {
					els.push(createElement(KwMd, {
						props: {
							tag: 'li',
							id: `#cite_note-${token.identifier}`,
							ast: token.children,
						},
					}));
				} else {
					if (token.children) {
						x(token.children);
					}
				}
			}
		}

		x(this.ast)

		return createElement('ol', els);
	}
});
