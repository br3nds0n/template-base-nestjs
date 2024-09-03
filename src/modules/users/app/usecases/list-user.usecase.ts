import {
  UseCase as DefaultUseCase,
  PaginationOutput,
  PaginationOutputMapper,
  SearchInput,
} from '@/common';

import { UserRepository } from '../../domain';
import { UserOutput } from '../dto/user-output';

export namespace ListUsersUseCase {
  export type Input = SearchInput;

  export type Output = PaginationOutput<UserOutput>;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private userRepository: UserRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const params = new UserRepository.SearchParams(input);
      const searchResult = await this.userRepository.search(params);

      return PaginationOutputMapper.toOutput(searchResult.items, searchResult);
    }
  }
}
