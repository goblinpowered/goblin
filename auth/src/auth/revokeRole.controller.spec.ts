import { Test, TestingModule } from '@nestjs/testing';
import { RevokeRoleRequest } from '../proto/authservice';
import { PostgresService } from '../services/postgres/postgres.service';
import { RevokeRoleController } from './revokeRole.controller';
import { Pool } from 'pg';
import {
  createGroup,
  createUser,
  createProfile,
  authenticate,
  grant,
} from '../testing/postgres';

describe('RevokeRoleController', () => {
  let controller: RevokeRoleController;
  let pool: Pool;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RevokeRoleController],
      providers: [
        PostgresService,
        {
          provide: 'POSTGRES',
          useClass: Pool,
        },
      ],
    }).compile();

    controller = module.get<RevokeRoleController>(RevokeRoleController);
    pool = module.get<Pool>('POSTGRES');
  });

  afterEach(async () => {
    await pool?.end();
  });

  test('builds', async () => {
    expect(controller).toBeDefined();
  });
});
