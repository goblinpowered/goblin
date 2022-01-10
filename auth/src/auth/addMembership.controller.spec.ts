import { Test, TestingModule } from '@nestjs/testing';
import { AddMembershipRequest } from '../proto/authservice';
import { AddMembershipController } from './addMembership.controller';
import { Pool } from 'pg';
import { createGroup } from '../testing/postgres';
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

  test('adds memberships', async () => {
    const g1 = await createGroup('parent', pool);
    const g2 = await createGroup('child', pool);
    expect(
      (
        await pool.query(
          `select * from memberships where parent = $1 and child = $2`,
          [g1, g2],
        )
      ).rowCount,
    ).toEqual(0);

    await controller.execute(
      AddMembershipRequest.fromPartial({ parent: g1, child: g2 }),
    );

    expect(
      (
        await pool.query(
          `select * from memberships where parent = $1 and child = $2`,
          [g1, g2],
        )
      ).rowCount,
    ).toEqual(1);
  });
});
