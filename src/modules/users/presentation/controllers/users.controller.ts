import { Body, Controller, Post } from '@nestjs/common';
import { SignupUseCase } from '../../app/usecases';
import { ApiResponse } from '@nestjs/swagger';
import { SignupDto } from './dtos/signup.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly signupUseCase: SignupUseCase.UseCase) {
    this.signupUseCase = signupUseCase;
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
    return await this.signupUseCase.execute(signupDto);
  }
}
