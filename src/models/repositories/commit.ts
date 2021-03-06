import { EntityRepository, Repository } from 'typeorm';
import { Commit } from '../entities/commit';
import { ensure } from '../../prelude/ensure';
import { awaitAll } from '../../prelude/await-all';
import { Users } from '..';

export type PackedCommit = any;

@EntityRepository(Commit)
export class CommitRepository extends Repository<Commit> {
	public async pack(
		src: Commit['id'] | Commit,
		detail: boolean = false
	): Promise<PackedCommit> {
		const commit = typeof src === 'object' ? src : await this.findOne(src).then(ensure);

		const packed = {
			id: commit.id,
			createdAt: commit.createdAt,
			action: commit.action,
			type: commit.type,
			key: commit.key,
			user: Users.pack(commit.userId),
			message: commit.message,
			data: detail ? commit.data : undefined,
		};

		return await awaitAll(packed);
	}

	public packMany(
		commits: (Commit['id'] | Commit)[],
		detail: boolean = false
	) {
		return Promise.all(commits.map(u => this.pack(u, detail)));
	}
}
