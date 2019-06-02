import { EntityRepository, Repository } from 'typeorm';
import { Commit } from '../entities/commit';
import { ensure } from '../../prelude/ensure';
import { awaitAll } from '../../prelude/await-all';

export type PackedCommit = any;

@EntityRepository(Commit)
export class CommitRepository extends Repository<Commit> {
	public async pack(
		src: Commit['id'] | Commit,
	): Promise<PackedCommit> {
		const commit = typeof src === 'object' ? src : await this.findOne(src).then(ensure);

		const packed = {
			id: commit.id,
		};

		return await awaitAll(packed);
	}

	public packMany(
		commits: (Commit['id'] | Commit)[],
	) {
		return Promise.all(commits.map(u => this.pack(u)));
	}
}
