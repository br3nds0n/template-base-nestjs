import { Module } from '@nestjs/common';
import { HashProvider } from '@/common';

import { SignupUseCase } from './app/usecases';
import { UserRepository } from './domain';
import { BcryptjsHashProvider, UserTypeormRepository } from './infra';

import { UsersController } from './presentation/controllers/users.controller';
import { EntityManager } from 'typeorm';

@Module({
  controllers: [UsersController],
  providers: [
    {
      provide: 'UserRepository',
      useFactory: (manager: EntityManager) => {
        return new UserTypeormRepository(manager);
      },
      inject: [EntityManager],
    },
    {
      provide: 'HashProvider',
      useClass: BcryptjsHashProvider,
    },

    {
      provide: SignupUseCase.UseCase,
      useFactory: (
        hashProvider: HashProvider,
        userRepository: UserRepository.Repository,
      ) => {
        return new SignupUseCase.UseCase(hashProvider, userRepository);
      },
      inject: ['HashProvider', 'UserRepository'],
    },
  ],
})
export class UsersModule {}
