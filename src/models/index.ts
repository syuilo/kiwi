import { getCustomRepository } from 'typeorm';
import { MetaRepository } from './repositories/meta';
import { UserRepository } from './repositories/user';
import { PageRepository } from './repositories/page';
import { FileRepository } from './repositories/file';

export const Metas = getCustomRepository(MetaRepository);
export const Users = getCustomRepository(UserRepository);
export const Pages = getCustomRepository(PageRepository);
export const Files = getCustomRepository(FileRepository);
