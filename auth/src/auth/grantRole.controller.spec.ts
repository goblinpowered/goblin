import { Test, TestingModule } from '@nestjs/testing';
import { GrantRoleRequest } from '../proto/authservice';
import { GrantRoleController } from './grantRole.controller';
import { Pool } from 'pg';
import {
  createGroup,
  createUser,
  createProfile,
  authenticate,
  grant,
} from '../testing/postgres';
import { AuthModule } from './auth.module';

describe('GrantRoleController', () => {
  let controller: GrantRoleController;
  let pool: Pool;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
    }).compile();

    controller = module.get<GrantRoleController>(GrantRoleController);
    pool = module.get<Pool>('POSTGRES');
  });

  afterEach(async () => {
    await pool?.end();
  });

  test('grants roles', async () => {
    const resource = await createProfile('resource', pool);
    const actor = await createProfile('actor', pool);
    const b = await pool.query(
      'select * from grants where resource_id = $1 and actor_id = $2',
      [resource, actor],
    );
    expect(b.rowCount).toEqual(0);
    await controller.execute({ resource, actor, role: 'test_role' });
    const a = await pool.query(
      'select * from grants where resource_id = $1 and actor_id = $2',
      [resource, actor],
    );
    expect(a.rowCount).toEqual(1);
    expect(a.rows[0].role).toEqual('test_role');
  });
});
