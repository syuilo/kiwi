import { getCustomRepository } from 'typeorm';
import { UserRepository } from './repositories/user';

export const Users = getCustomRepository(UserRepository);
