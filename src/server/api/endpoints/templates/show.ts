import $ from 'cafy';
import define from '../../define';
import { ApiError } from '../../error';
import { Templates } from '../../../../models';
import { Template } from '../../../../models/entities/template';

export const meta = {
	params: {
		id: {
			validator: $.optional.str,
		},

		name: {
			validator: $.optional.str,
		},
	},

	errors: {
		noSuchTemplate: {
			message: 'No such template.',
			code: 'NO_SUCH_TEMPLATE',
			id: 'b4d861b9-7779-42cc-b37d-f22eda10e20c'
		}
	}
};

export default define(meta, async (ps, user) => {
	let template: Template | undefined;

	if (ps.id) {
		template = await Templates.findOne(ps.id);
	} else if (ps.name) {
		template = await Templates.findOne({
			name: ps.name
		});
	}

	if (template == null) {
		throw new ApiError(meta.errors.noSuchTemplate);
	}

	return await Templates.pack(template);
});
