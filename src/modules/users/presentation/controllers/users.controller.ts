import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ListUsersUseCase, SignupUseCase } from '../../app/usecases';
import { ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { SignupDto } from './dtos/signup.dto';
import { ListUsersDto } from './dtos/list-users.dto';
import {
  UserCollectionPresenter,
  UserPresenter,
} from '../presenters/user.presenter';

@Controller('users')
export class UsersController {
  constructor(
    private readonly signupUseCase: SignupUseCase.UseCase,
    private readonly listUsersUseCase: ListUsersUseCase.UseCase,
  ) {
    this.signupUseCase = signupUseCase;
    this.listUsersUseCase = listUsersUseCase;
  }

  @ApiResponse({
    status: 409,
    description: 'Conflito de e-mail',
  })
  @ApiResponse({
    status: 422,
    description: 'Corpo da requisição com dados inválidos',
  })
  @Post()
  async create(@Body() signupDto: SignupDto) {
    const output = await this.signupUseCase.execute(signupDto);
    return new UserPresenter(output);
  }

  @ApiResponse({
    status: 200,
    schema: {
      type: 'object',
      properties: {
        meta: {
          type: 'object',
          properties: {
            total: {
              type: 'number',
            },
            currentPage: {
              type: 'number',
            },
            lastPage: {
              type: 'number',
            },
            perPage: {
              type: 'number',
            },
          },
        },
        data: {
          type: 'array',
          items: {
            $ref: getSchemaPath(UserPresenter),
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 422,
    description: 'Parâmetros de consulta inválidos',
  })
  @ApiResponse({
    status: 401,
    description: 'Acesso não autorizado',
  })
  @Get()
  async search(@Query() searchParams: ListUsersDto) {
    const output = await this.listUsersUseCase.execute(searchParams);
    return new UserCollectionPresenter(output);
  }
}
