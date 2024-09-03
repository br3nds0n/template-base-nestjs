import { UserEntity, UserRepository } from '@/modules/users/domain';
import { EntityManager, Repository } from 'typeorm';
import { UserSchema } from '../schemas/user.entity-schema';
import { BadRequestError, TypeormBaseRepository } from '@/common';

export class UserTypeormRepository
  extends TypeormBaseRepository<UserEntity>
  implements UserRepository.Repository
{
  protected repository: Repository<UserEntity>;

  constructor(manager: EntityManager) {
    super(manager.getRepository(UserSchema));
    this.repository = manager.getRepository(UserSchema);
  }

  findByEmail(email: string): Promise<UserEntity> {
    console.log(email);
    throw new Error('Method not implemented.');
  }

  async emailExists(email: string): Promise<void> {
    const user = await this.repository.findOne({ where: { email } });
    if (user) {
      throw new BadRequestError('User already exists');
    }
  }
}
