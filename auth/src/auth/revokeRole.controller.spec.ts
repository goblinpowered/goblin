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
import { RevokeRoleRequest } from 'proto/authservice';

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

  test('revokes roles', async () => {
    const resource = await createProfile('resource', pool);
    const actor = await createProfile('actor', pool);
    await pool.query(
      'insert into grants (resource_id, actor_id, role) values ($1, $2, $3)',
      [resource, actor, 'test_role'],
    );
    const b = await pool.query(
      'select * from grants where resource_id = $1 and actor_id = $2',
      [resource, actor],
    );
    expect(b.rowCount).toEqual(1);
    await controller.execute(
      RevokeRoleRequest.fromPartial({ resource, actor, role: 'test_role' }),
    );
    const a = await pool.query(
      'select * from grants where resource_id = $1 and actor_id = $2',
      [resource, actor],
    );
    expect(a.rowCount).toEqual(0);
    expect(a.rows[0].role).toEqual('test_role');
  });
});
