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
  const idp = 'test_idp';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
    }).compile();

    controller = module.get<AuthenticateController>(AuthenticateController);
    pool = module.get<Pool>('POSTGRES');
    await pool.query(
      `alter type idp_authorities add value if not exists '${idp}'`,
    );
  });

  afterEach(async () => {
    await pool?.end();
  });

  test('authenticates positive', async () => {
    const user = await createUser('user', pool);
    const token = 'ooooid';
    await pool.query(
      'insert into authn (user_id, oid, idp) values ($1, $2, $3)',
      [user, token, idp],
    );
    const response = await controller.execute(
      AuthenticateRequest.fromPartial({ user, token, idp }),
    );
    expect(response.authenticated).toEqual(true);
  });

  test('authenticates negative, existing', async () => {
    const user = await createUser('user', pool);
    const token = 'ooooid';
    await pool.query(
      'insert into authn (user_id, oid, idp) values ($1, $2, $3)',
      [user, token, idp],
    );
    const response = await controller.execute(
      AuthenticateRequest.fromPartial({ user, token: 'incorrect', idp }),
    );
    expect(response.authenticated).toEqual(false);
  });

  test('authenticates negative, not existing', async () => {
    const response = await controller.execute(
      AuthenticateRequest.fromPartial({
        user: randomUUID(),
        token: 'stuff',
        idp,
      }),
    );
    expect(response.authenticated).toEqual(false);
  });
});
