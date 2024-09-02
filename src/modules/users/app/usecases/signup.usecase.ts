import {
  BadRequestError,
  UseCase as DefaultUseCase,
  HashProvider,
} from '@/common';
import { UserOutput, UserOutputMapper } from '../dto/user-output';
import { UserEntity, UserRepository } from '../../domain';

export namespace SignupUseCase {
  export type Input = {
    name: string;
    email: string;
    password: string;
  };

  export type Output = UserOutput;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private hashProvider: HashProvider,
      private userRepository: UserRepository.Repository,
    ) {}

    async execute(input: Input) {
      const { email, name, password } = input;

      if (!email || !name || !password) {
        throw new BadRequestError('Input data not provided');
      }

      await this.userRepository.emailExists(email);
      const hashPassword = await this.hashProvider.generateHash(password);

      const entity = UserEntity.create({ email, name, password: hashPassword });

      await this.userRepository.insert(entity);
      return UserOutputMapper.toOutput(entity);
    }
  }
}
