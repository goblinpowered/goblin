import { Test, TestingModule } from '@nestjs/testing';
import { RemoveMembershipRequest } from '../proto/authservice';
import { PostgresService } from '../services/postgres/postgres.service';
import { RemoveMembershipController } from './removeMembership.controller';
import { Pool } from 'pg';
import {
  createGroup,
  createUser,
  createProfile,
  authenticate,
  grant,
} from '../testing/postgres';

describe('RemoveMembershipController', () => {
  let controller: RemoveMembershipController;
  let pool: Pool;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RemoveMembershipController],
      providers: [
        PostgresService,
        {
          provide: 'POSTGRES',
          useClass: Pool,
        },
      ],
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
