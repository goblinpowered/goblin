import { Test, TestingModule } from '@nestjs/testing';
import { RemoveMembershipRequest } from '../proto/authservice';
import { RemoveMembershipController } from './removeMembership.controller';
import { Pool } from 'pg';
import {
  createGroup,
  createUser,
  createProfile,
  authenticate,
  grant,
} from '../testing/postgres';
import { AuthModule } from './auth.module';

describe('RemoveMembershipController', () => {
  let controller: RemoveMembershipController;
  let pool: Pool;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
    }).compile();

    controller = module.get<RemoveMembershipController>(
      RemoveMembershipController,
    );
    pool = module.get<Pool>('POSTGRES');
  });

  afterEach(async () => {
    await pool?.end();
  });

  test('builds', async () => {
    expect(controller).toBeDefined();
  });
});
