import { Test, TestingModule } from '@nestjs/testing';
import { ResendController } from './resend.controller';
import { ResendService } from './resend.service';

describe('ResendController', () => {
  let controller: ResendController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResendController],
      providers: [ResendService],
    }).compile();

    controller = module.get<ResendController>(ResendController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
