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

		logoUrl: {
			validator: $.str,
		},

		customHtml: {
			validator: $.str,
		},

		defaultPermissions: {
			validator: $.arr($.str),
		},

		recaptchaSiteKey: {
			validator: $.str,
		},

		recaptchaSecretKey: {
			validator: $.str,
		},
	},
};

export default define(meta, async (ps, user) => {
	await Metas.update({}, {
		name: ps.name,
		description: ps.description,
		logoUrl: ps.logoUrl,
		customHtml: ps.customHtml,
		defaultPermissions: ps.defaultPermissions,
		recaptchaSiteKey: ps.recaptchaSiteKey,
		recaptchaSecretKey: ps.recaptchaSecretKey,
	});

	return Metas.pack(await Metas.fetch());
});
