import { Controller, Get, INestApplication } from '@nestjs/common';
import request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestError } from '@/common/app';
import { BadRequestErrorFilter } from '../../bad-request-error.filter';

@Controller('stub')
class StubController {
  @Get()
  index() {
    throw new BadRequestError('Bad Request');
  }
}

describe('BadRequestErrorFilter (e2e)', () => {
  let app: INestApplication;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [StubController],
    }).compile();
    app = module.createNestApplication();
    app.useGlobalFilters(new BadRequestErrorFilter());
    await app.init();
  });

  it('should be defined', () => {
    expect(new BadRequestErrorFilter()).toBeDefined();
  });

  it('should catch a BadRequesError', () => {
    return request(app.getHttpServer()).get('/stub').expect(400).expect({
      statusCode: 400,
      error: 'Bad Request',
      message: 'Bad Request',
    });
  });
});
