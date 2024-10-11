import { TestModule } from '@/test.module';
import { Test, TestingModule } from '@nestjs/testing';

describe('RedisService', () => {
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TestModule],
    }).compile();
  });

  it('Just a simple test', () => {
    expect(true).toBeTruthy();
  });

  it('Test Module Should be defined', () => {
    expect(module).toBeDefined();
  });
});
