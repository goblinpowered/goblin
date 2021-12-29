import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class GroupsService {
  constructor(private pool: Pool) {}

  async addMember({ parent, child }: { parent: string; child: string }) {
    await this.pool.query(
      `insert into memberships (parent, child) values ($1, $2)`,
      [parent, child],
    );
  }

  async createGroup(name: string): Promise<string> {
    return (
      await this.pool.query(
        `WITH allocated_actor AS (
        INSERT INTO actors (actor_type)
            VALUES ('group')
          RETURNING
            actor_id
        ), created_group AS (
        INSERT INTO actor_groups (group_name, group_id)
          SELECT
            $1 group_name,
            actor_id group_id
          FROM
            allocated_actor
          RETURNING
            group_id)
          INSERT INTO memberships (parent, child)
          SELECT
            group_id parent,
            group_id child
          FROM
            created_group
          RETURNING
            parent`,
        [name],
      )
    ).rows[0].parent;
  }
}
