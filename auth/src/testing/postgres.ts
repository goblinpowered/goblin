import { Pool } from 'pg';

export async function createGroup(name: string, pool: Pool) {
  return createActor(
    {
      name,
      tableName: 'actor_groups',
      id: 'group_id',
      type: 'group',
    },
    pool,
  );
}

export async function createProfile(name: string, pool: Pool) {
  return createActor(
    {
      name,
      tableName: 'profiles',
      id: 'profile_id',
      type: 'profile',
    },
    pool,
  );
}

export async function createUser(name: string, pool: Pool) {
  return createActor(
    {
      name,
      tableName: 'users',
      id: 'user_id',
      type: 'user',
    },
    pool,
  );
}

export async function createResource(type: string, pool: Pool) {
  const qstring = `
      insert into resources (resource_type) values ($1) returning resource_id
    `;
  const result = await pool.query(qstring, [type]);
  return result.rows[0].resource_id;
}

export async function createActor(
  {
    name,
    tableName,
    id,
    type,
  }: Pick<Record<string, string>, 'name' | 'tableName' | 'id' | 'type'>,
  pool: Pool,
): Promise<string> {
  const result = await pool.query(
    `
        WITH allocated_actor AS (
        INSERT INTO resources (resource_type)
                VALUES ($1)
            RETURNING
                resource_id
        ),
        allocated_thing AS (
        INSERT INTO ${tableName} (${type}_name, ${id})
            SELECT
                $2 ${type}_name,
                resource_id ${id}
            FROM
                allocated_actor
            RETURNING
                ${id}
        )
        INSERT INTO memberships (parent, child)
        SELECT ${id}, ${id}
        FROM
            allocated_thing
        RETURNING
            parent;
    `,
    [type, name],
  );
  return result.rows[0].parent;
}

export async function grant(
  {
    resource,
    role,
    actor,
  }: {
    resource: string;
    role: string;
    actor: string;
  },
  pool: Pool,
) {
  await pool.query(
    'insert into grants (resource_id, actor_id, granted_role) values ($1, $2, $3)',
    [resource, actor, role],
  );
}

export async function authenticate(
  {
    user,
    token,
  }: {
    user: string;
    token: string;
  },
  pool: Pool,
) {
  await pool.query(
    'insert into authn (user_id, oid, idp) values ($1, $2, $3)',
    [user, token, 'firebase'],
  );
}
