import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/user';
import { ensure } from '../../prelude/ensure';
import { awaitAll } from '../../prelude/await-all';

export type PackedUser = any;

@EntityRepository(User)
export class UserRepository extends Repository<User> {
	public async pack(
		src: User['id'] | User,
	): Promise<PackedUser> {
		const user = typeof src === 'object' ? src : await this.findOne(src).then(ensure);

		const packed = {
			id: user.id,
			name: user.name,
			isAdmin: user.isAdmin,
		};

		return await awaitAll(packed);
	}

	public packMany(
		users: (User['id'] | User)[],
	) {
		return Promise.all(users.map(u => this.pack(u)));
	}
}
