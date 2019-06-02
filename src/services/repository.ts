import { User } from '../models/entities/user';
import { Commits } from '../models';
import { Commit } from '../models/entities/commit';

/**
 * Repository
 */
export class Kwr {
	public static commit(user: User | null, message: string | null, type: string, content: any) {
		return Commits.save(new Commit({
			createdAt: new Date(),
			type: type,
			userId: user ? user.id : null,
			message: message,
			content: content,
		}));
	}
}
