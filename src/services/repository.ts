import { User } from '../models/entities/user';
import { Commits } from '../models';
import { Commit } from '../models/entities/commit';

/**
 * Repository
 */
export class Kwr {
	public static commit(user: User, message: string | null, action: string, type: string, key: string, data: any) {
		return Commits.save(new Commit({
			createdAt: new Date(),
			key: key,
			action: action,
			type: type,
			userId: user.id,
			message: message,
			data: data,
		}));
	}
}
