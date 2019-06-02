import { EntityRepository, Repository, getConnection } from 'typeorm';
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
		src: Meta,
	): Promise<PackedMeta> {
		const packed = {
			name: src.name,
			description: src.description,
			defaultPermissions: src.defaultPermissions,
		};

		return packed;
	}
}
