import $ from 'cafy';
import define from '../../define';
import { Metas } from '../../../../models';

export const meta = {
	kind: 'admin',

	params: {
		name: {
			validator: $.str,
		},
	},
};

export default define(meta, async (ps, user) => {
	await Metas.update({}, {
		name: ps.name,
	});
});
