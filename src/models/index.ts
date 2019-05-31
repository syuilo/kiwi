import { getCustomRepository } from 'typeorm';
import { MetaRepository } from './repositories/meta';
import { UserRepository } from './repositories/user';

export const Metas = getCustomRepository(MetaRepository);
export const Users = getCustomRepository(UserRepository);
