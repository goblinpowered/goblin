import { Test, TestingModule } from '@nestjs/testing';
import { AddMembershipRequest } from '../proto/authservice';
import { PostgresService } from '../services/postgres/postgres.service';
import { AddMembershipController } from './addMembership.controller';
import { Pool } from 'pg';
import {
  createGroup,
  createUser,
  createProfile,
  authenticate,
  grant,
} from '../testing/postgres';
import { AuthModule } from './auth.module';

describe('AddMembershipController', () => {
  let controller: AddMembershipController;
  let pool: Pool;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
    }).compile();

    controller = module.get<AddMembershipController>(AddMembershipController);
    pool = module.get<Pool>('POSTGRES');
  });

  afterEach(async () => {
    await pool?.end();
  });

  test('builds', async () => {
    expect(controller).toBeDefined();
  });
});
