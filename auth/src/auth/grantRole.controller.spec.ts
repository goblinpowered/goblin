import { Test, TestingModule } from '@nestjs/testing';
import { GrantRoleRequest } from '../proto/authservice';
import { PostgresService } from '../services/postgres/postgres.service';
import { GrantRoleController } from './grantRole.controller';
import { Pool } from 'pg';
import {
  createGroup,
  createUser,
  createProfile,
  authenticate,
  grant,
} from '../testing/postgres';

describe('GrantRoleController', () => {
  let controller: GrantRoleController;
  let pool: Pool;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GrantRoleController],
      providers: [
        PostgresService,
        {
          provide: 'POSTGRES',
          useClass: Pool,
        },
      ],
    }).compile();

    controller = module.get<GrantRoleController>(GrantRoleController);
    pool = module.get<Pool>('POSTGRES');
  });

  afterEach(async () => {
    await pool?.end();
  });

  test('builds', async () => {
    expect(controller).toBeDefined();
  });
});
