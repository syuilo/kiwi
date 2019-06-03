import { getCustomRepository } from 'typeorm';
import { MetaRepository } from './repositories/meta';
import { UserRepository } from './repositories/user';
import { PageRepository } from './repositories/page';
import { FileRepository } from './repositories/file';
import { CommitRepository } from './repositories/commit';
import { TemplateRepository } from './repositories/template';

export const Metas = getCustomRepository(MetaRepository);
export const Users = getCustomRepository(UserRepository);
export const Pages = getCustomRepository(PageRepository);
export const Files = getCustomRepository(FileRepository);
export const Commits = getCustomRepository(CommitRepository);
export const Templates = getCustomRepository(TemplateRepository);
