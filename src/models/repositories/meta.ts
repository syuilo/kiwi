import { EntityRepository, getConnection, Repository } from 'typeorm';
import { Meta } from '../entities/meta';

export type PackedMeta = any;

@EntityRepository(Meta)
export class MetaRepository extends Repository<Meta> {
	public async fetch(): Promise<Meta> {
		return await getConnection().transaction(async transactionalEntityManager => {
			const meta = await transactionalEntityManager.findOne(Meta);

			if (meta) {
				return meta;
			} else {
				return await transactionalEntityManager.save(Meta, {
					id: 0,
					name: 'My Wiki',
					description: 'This is my cool wiki.'
				}) as Meta;
			}
		});
	}

	public async pack(
		meta: Meta,
		secret = false
	): Promise<PackedMeta> {
		return {
			name: meta.name,
			description: meta.description,
			logoUrl: meta.logoUrl,
			defaultPermissions: meta.defaultPermissions,
			recaptchaSiteKey: meta.recaptchaSiteKey,
			adClient: meta.adClient,
			adSlot1: meta.adSlot1,
			adSlot2: meta.adSlot2,
			...(secret ? {
				customHtml: meta.customHtml,
				recaptchaSecretKey: meta.recaptchaSecretKey
			} : {})
		};
	}
}
