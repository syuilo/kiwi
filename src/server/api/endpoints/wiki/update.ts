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

		adClient: {
			validator: $.str,
		},

		adSlot1: {
			validator: $.str,
		},

		adSlot2: {
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
		adClient: ps.adClient,
		adSlot1: ps.adSlot1,
		adSlot2: ps.adSlot2,
		defaultPermissions: ps.defaultPermissions,
		recaptchaSiteKey: ps.recaptchaSiteKey,
		recaptchaSecretKey: ps.recaptchaSecretKey,
	});

	return Metas.pack(await Metas.fetch());
});
