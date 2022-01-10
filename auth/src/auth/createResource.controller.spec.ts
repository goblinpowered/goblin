import { Test, TestingModule } from '@nestjs/testing';
import { CreateResourceRequest } from '../proto/authservice';
import { CreateResourceController } from './createResource.controller';
import { Pool } from 'pg';
import { AuthModule } from './auth.module';
import { randomUUID } from 'crypto';

describe('CreateResourceController', () => {
  let controller: CreateResourceController;
  let pool: Pool;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
    }).compile();

    controller = module.get<CreateResourceController>(CreateResourceController);
    pool = module.get<Pool>('POSTGRES');
  });

  afterEach(async () => {
    await pool?.end();
  });

  test('creates resource with undefined id', async () => {
    const response = await controller.execute(
      CreateResourceRequest.fromPartial({
        type: 'test_type',
      }),
    );
    expect(response.id).toBeDefined();
    const res = await pool.query('select * from resources where id = $1', [
      response.id,
    ]);
    expect(res.rows[0].type).toEqual('test_type');
  });

  test('creates resource with defined id', async () => {
    const id = randomUUID();
    const response = await controller.execute(
      CreateResourceRequest.fromPartial({
        id,
        type: 'test_type',
      }),
    );
    expect(response.id).toEqual(id);
    const res = await pool.query('select * from resources where id = $1', [
      response.id,
    ]);
    expect(res.rows[0].type).toEqual('test_type');
  });
});
