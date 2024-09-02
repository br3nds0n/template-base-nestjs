import { EntitySchema } from 'typeorm';
import { UserEntity } from '@/modules/users/domain/entities/user.entity';

export const UserSchema = new EntitySchema<UserEntity>({
  name: 'user',
  tableName: 'user',
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
