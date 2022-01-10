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

  test('removes existing memberships', async () => {
    const g1 = await createGroup('parent', pool);
    const g2 = await createGroup('child', pool);
    await pool.query(
      'insert into memberships (parent, child) values ($1, $2)',
      [g1, g2],
    );
    expect(
      (
        await pool.query(
          'select * from memberships where parent = $1 and child = $2',
          [g1, g2],
        )
      ).rowCount,
    ).toEqual(1);
    await controller.execute(
      RemoveMembershipRequest.fromPartial({ parent: g1, child: g2 }),
    );
    expect(
      (
        await pool.query(
          'select * from memberships where parent = $1 and child = $2',
          [g1, g2],
        )
      ).rowCount,
    ).toEqual(0);
  });

  test('works with nonexistent memberships', async () => {
    const g1 = await createGroup('parent', pool);
    const g2 = await createGroup('child', pool);
    expect(
      (
        await pool.query(
          'select * from memberships where parent = $1 and child = $2',
          [g1, g2],
        )
      ).rowCount,
    ).toEqual(0);
    await controller.execute(
      RemoveMembershipRequest.fromPartial({ parent: g1, child: g2 }),
    );
    expect(
      (
        await pool.query(
          'select * from memberships where parent = $1 and child = $2',
          [g1, g2],
        )
      ).rowCount,
    ).toEqual(0);
  });
});
