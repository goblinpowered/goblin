import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { AuthorizeRequest } from 'proto/authservice';
import { pgIdent } from './ident';

export interface ResourceType {
  tableName: string;
  id: string;
  type: string;
}

@Injectable()
export class PostgresService {
  constructor(@Inject('POSTGRES') private pool: Pool) {}

  async grantRole({
    resource,
    actor,
    role,
  }: {
    resource: string;
    actor: string;
    role: string;
  }) {
    await this.pool.query(
      `insert into roles (resource_id, actor_id, resource_role) values ($1, $2, $3)`,
      [resource, actor, role],
    );
  }

  async addMembership({ parent, child }: { parent: string; child: string }) {
    await this.pool.query(
      'insert into memberships (parent, child) values ($1, $2)',
      [parent, child],
    );
  }

  async removeMembership({ parent, child }: { parent: string; child: string }) {
    await this.pool.query(
      'delete from memberships where parent = $1 and child = $2',
      [parent, child],
    );
  }

  async isAuthorized({
    role,
    actor,
    resource,
  }: {
    role: string;
    actor: string;
    resource: string;
  }) {
    const result = await this.pool.query(
      `SELECT
        *
      FROM
        transitive_memberships
        JOIN grants ON transitive_memberships.parent = grants.actor_id
      WHERE
        grants.granted_role = $1
        AND child = $2
        AND grants.resource_id = $3
      LIMIT 1`,
      [role, actor, resource],
    );
    return result.rowCount > 0;
  }

  async isAuthenticated({ user, token }: { user: string; token: string }) {
    const result = await this.pool.query(
      `SELECT
        *
      FROM
        authn
      WHERE
        user_id = $1
        AND oid = $2`,
      [user, token],
    );
    return result.rowCount > 0;
  }
}
