import { UserEntity } from '@/modules/users/domain/entities/user.entity';
import { EntitySchema } from 'typeorm';

class UserSchema extends EntitySchema<UserEntity> {
  constructor() {
    super({
      name: 'User',
      tableName: 'user',
      target: UserEntity,
      columns: {
        id: {
          name: 'user_id',
          type: 'uuid',
          primary: true,
          nullable: false,
        },
        name: {
          type: 'varchar',
          length: 255,
        },
        email: {
          type: 'varchar',
          length: 255,
          unique: true,
        },
        password: {
          type: 'varchar',
          length: 255,
        },
        createdAt: {
          type: 'timestamp',
          createDate: true,
        },
      },
    });
  }
}

export default new UserSchema();
