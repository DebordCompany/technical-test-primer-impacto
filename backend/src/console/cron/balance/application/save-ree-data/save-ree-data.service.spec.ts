import { Test, TestingModule } from '@nestjs/testing';
import { SaveReeDataService } from './save-ree-data.service';

describe('SaveRccDataService', () => {
  let service: SaveReeDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SaveReeDataService],
    }).compile();

    service = module.get<SaveReeDataService>(SaveReeDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
