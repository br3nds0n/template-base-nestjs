import { Test, TestingModule } from '@nestjs/testing';
import { EnvConfigService } from '../../env-config.service';
import { EnvConfigModule } from '../../env-config.module';

describe('EnvConfigService', () => {
  let service: EnvConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [EnvConfigModule.forRoot()],
      providers: [EnvConfigService],
    }).compile();

    service = module.get<EnvConfigService>(EnvConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return the variable PORT', () => {
    expect(service.getAppPort()).toBe(3000);
  });

  it('should return the variable NODE_ENV', () => {
    expect(service.getNodeEnv()).toBe('test');
  });

  it('should return the variable JWT_SECRET', () => {
    expect(service.getJwtSecret()).toBe('fake_secret');
  });

  it('should return the variable JWT_EXPIRES_IN', () => {
    expect(service.getJwtExpiresInSeconds()).toBe(86400);
  });
});
