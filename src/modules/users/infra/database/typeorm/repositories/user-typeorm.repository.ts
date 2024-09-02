import { UserEntity, UserRepository } from '@/modules/users/domain';
import { EntityManager, Repository } from 'typeorm';
import { UserSchema } from '../schemas/user.entity-schema';

export class UserTypeormRepository implements UserRepository.Repository {
  private repository: Repository<UserEntity>;

  sortableFields: string[];

  constructor(manager: EntityManager) {
    this.repository = manager.getRepository(UserSchema);
  }

  findByEmail(email: string): Promise<UserEntity> {
    console.log(email);
    throw new Error('Method not implemented.');
  }
  async emailExists(email: string): Promise<void> {
    const user = await this.repository.findOne({ where: { email } });
    if (user) {
      throw new Error('User already exists');
    }
  }
  search(
    props: UserRepository.SearchParams,
  ): Promise<UserRepository.SearchResult> {
    console.log(props);
    throw new Error('Method not implemented.');
  }
  findById(id: string): Promise<UserEntity> {
    console.log(id);
    throw new Error('Method not implemented.');
  }
  findAll(): Promise<UserEntity[]> {
    throw new Error('Method not implemented.');
  }
  async insert(entity: UserEntity): Promise<void> {
    await this.repository.insert(entity);
  }
  update(entity: UserEntity): Promise<void> {
    console.log(entity);
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    console.log(id);
    throw new Error('Method not implemented.');
  }
}
