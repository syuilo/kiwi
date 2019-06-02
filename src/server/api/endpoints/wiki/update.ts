import $ from 'cafy';
import define from '../../define';
import { Metas } from '../../../../models';

export const meta = {
	permission: 'update:wiki',

	params: {
		name: {
			validator: $.str,
		},

		description: {
			validator: $.str,
		},

		defaultPermissions: {
			validator: $.arr($.str),
		},
	},
};

export default define(meta, async (ps, user) => {
	await Metas.update({}, {
		name: ps.name,
		description: ps.description,
		defaultPermissions: ps.defaultPermissions,
	});

	return Metas.pack(await Metas.fetch());
});
