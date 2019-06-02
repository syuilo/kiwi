import { User } from '../models/entities/user';
import { Commits } from '../models';
import { Commit } from '../models/entities/commit';

/**
 * Repository
 */
export class Kwr {
	public static commit(user: User, message: string | null, type: string, content: any) {
		return Commits.save(new Commit({
			createdAt: new Date(),
			type: type,
			userId: user.id,
			message: message,
			content: content,
		}));
	}
}
