import { Test, TestingModule } from '@nestjs/testing';
import { AuthorizeRequest } from '../proto/authservice';
import { AuthorizeController } from './authorize.controller';
import { Pool } from 'pg';
import {
  createGroup,
  createResource,
  createProfile,
  grant,
} from '../testing/postgres';
import { AuthModule } from './auth.module';

describe('AuthorizeController', () => {
  let controller: AuthorizeController;
  let pool: Pool;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
    }).compile();

    controller = module.get<AuthorizeController>(AuthorizeController);
    pool = module.get<Pool>('POSTGRES');
  });

  afterEach(async () => {
    await pool?.end();
  });

  test('it checks direct grants', async () => {
    const resource = await createGroup('campaign', pool);
    const actor = await createProfile('actor', pool);
    await grant({ resource, actor, role: 'potato' }, pool);
    const result = await controller.execute(
      AuthorizeRequest.fromPartial({
        resource,
        actor,
        role: 'potato',
      }),
    );
    expect(result.authorized).toEqual(true);
  });

  test('it checks indirect grants', async () => {
    const g1 = await createGroup('parent', pool);
    const g2 = await createGroup('child', pool);
    const resource = await createResource('campaign', pool);
    const actor = await createProfile('actor', pool);
    await grant({ resource, actor: g1, role: 'potato' }, pool);
    await pool.query(
      'insert into memberships (parent, child) values ($1, $2)',
      [g1, g2],
    );
    await pool.query(
      'insert into memberships (parent, child) values ($1, $2)',
      [g2, actor],
    );
    const result = await controller.execute(
      AuthorizeRequest.fromPartial({
        resource,
        actor,
        role: 'potato',
      }),
    );
    expect(result.authorized).toEqual(true);
  });
});
