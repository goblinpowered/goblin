import { Test, TestingModule } from '@nestjs/testing';
import { Pool } from 'pg';
import { createGroup } from '../../testing/postgres';
import { PostgresService } from './postgres.service';

describe('PostgresService', () => {
  let service: PostgresService;
  let pool: Pool;

  beforeEach(async () => {
    pool = new Pool();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostgresService,
        {
          provide: 'POSTGRES',
          useValue: pool,
        },
      ],
    }).compile();

    service = module.get<PostgresService>(PostgresService);
  });

  afterEach(async () => {
    await pool?.end();
  });

  test('it defines postgres', async () => {
    const actor = await createGroup('actor', pool);
    const resource = await createGroup('resource', pool);
    await pool.query(
      'insert into grants (resource_id, actor_id, granted_role) values ($1, $2, $3)',
      [resource, actor, 'potato'],
    );
    expect(
      await service.isAuthorized({
        actor: actor,
        resource: resource,
        role: 'potato',
      }),
    ).toEqual(true);
  });
});
