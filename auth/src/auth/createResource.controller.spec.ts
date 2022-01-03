import { Test, TestingModule } from '@nestjs/testing';
import { CreateResourceRequest } from '../proto/authservice';
import { PostgresService } from '../services/postgres/postgres.service';
import { CreateResourceController } from './createResource.controller';
import { Pool } from 'pg';
import {
  createGroup,
  createUser,
  createProfile,
  authenticate,
  grant,
} from '../testing/postgres';

describe('CreateResourceController', () => {
  let controller: CreateResourceController;
  let pool: Pool;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateResourceController],
      providers: [
        PostgresService,
        {
          provide: 'POSTGRES',
          useClass: Pool,
        },
      ],
    }).compile();

    controller = module.get<CreateResourceController>(CreateResourceController);
    pool = module.get<Pool>('POSTGRES');
  });

  afterEach(async () => {
    await pool?.end();
  });

  test('builds', async () => {
    expect(controller).toBeDefined();
  });
});
