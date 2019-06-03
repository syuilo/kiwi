import { EntityRepository, Repository } from 'typeorm';
import { Template } from '../entities/template';
import { ensure } from '../../prelude/ensure';
import { awaitAll } from '../../prelude/await-all';

export type PackedTemplate = any;

@EntityRepository(Template)
export class TemplateRepository extends Repository<Template> {
	public async pack(
		src: Template['id'] | Template,
	): Promise<PackedTemplate> {
		const template = typeof src === 'object' ? src : await this.findOne(src).then(ensure);

		const packed = {
			id: template.id,
			name: template.name,
			attributes: template.attributes,
		};

		return await awaitAll(packed);
	}

	public packMany(
		templates: (Template['id'] | Template)[],
	) {
		return Promise.all(templates.map(u => this.pack(u)));
	}
}
