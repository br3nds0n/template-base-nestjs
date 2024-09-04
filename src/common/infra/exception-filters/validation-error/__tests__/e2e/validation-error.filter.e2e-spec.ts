import { Controller, Get, INestApplication } from '@nestjs/common';
import request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { EntityValidationError, FieldsErrors } from '@/common/domain';
import { EntityValidationErrorFilter } from '../../validation-error.filter';

@Controller('stub')
class StubController {
  @Get()
  index() {
    const erros = {
      name: ['Name is required'],
    } as FieldsErrors;

    throw new EntityValidationError(erros);
  }
}

describe('EntityValidationErrorFilter (e2e)', () => {
  let app: INestApplication;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [StubController],
    }).compile();
    app = module.createNestApplication();
    app.useGlobalFilters(new EntityValidationErrorFilter());
    await app.init();
  });

  it('should be defined', () => {
    expect(new EntityValidationErrorFilter()).toBeDefined();
  });

  it('should catch EntityValidationError', () => {
    return request(app.getHttpServer())
      .get('/stub')
      .expect(400)
      .expect({
        statusCode: 400,
        error: 'Entity Validation Error',
        message: { name: ['Name is required'] },
      });
  });
});
