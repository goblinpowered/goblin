import { Test, TestingModule } from '@nestjs/testing';
import { RevokeRoleController } from './revokeRole.controller';
import { Pool } from 'pg';
import {
  createGroup,
  createUser,
  createProfile,
  authenticate,
  grant,
} from '../testing/postgres';
import { AuthModule } from './auth.module';

describe('RevokeRoleController', () => {
  let controller: RevokeRoleController;
  let pool: Pool;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
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
