import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticateRequest } from '../proto/authservice';
import { AuthenticateController } from './authenticate.controller';
import { Pool } from 'pg';
import {
  createGroup,
  createUser,
  createProfile,
  authenticate,
  grant,
} from '../testing/postgres';
import { AuthModule } from './auth.module';
import { randomUUID } from 'crypto';

describe('AuthenticateController', () => {
  let controller: AuthenticateController;
  let pool: Pool;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
    }).compile();

    controller = module.get<AuthenticateController>(AuthenticateController);
    pool = module.get<Pool>('POSTGRES');
  });

  afterEach(async () => {
    await pool?.end();
  });

  test('authenticates positive', async () => {
    const user = await createUser('user', pool);
    const token = 'ooooid';
    await pool.query('insert into authn (user_id, oid) values ($1, $2)', [
      user,
      token,
    ]);
    const response = await controller.execute(
      AuthenticateRequest.fromPartial({ user, token }),
    );
    expect(response.authenticated).toEqual(true);
  });

  test('authenticates negative, existing', async () => {
    const user = await createUser('user', pool);
    const token = 'ooooid';
    await pool.query('insert into authn (user_id, oid) values ($1, $2)', [
      user,
      token,
    ]);
    const response = await controller.execute(
      AuthenticateRequest.fromPartial({ user, token: 'incorrect' }),
    );
    expect(response.authenticated).toEqual(true);
  });

  test('authenticates negative, not existing', async () => {
    const response = await controller.execute(
      AuthenticateRequest.fromPartial({ user: randomUUID(), token: 'stuff' }),
    );
    expect(response.authenticated).toEqual(false);
  });
});
