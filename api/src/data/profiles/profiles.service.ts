import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class ProfilesService {
  constructor(private pool: Pool) {}

  async createProfile(name: string): Promise<string> {
    const result = await this.pool.query(
      `
        WITH allocated_actor AS (
        INSERT INTO actors (actor_type)
                VALUES ('profile')
            RETURNING
                actor_id
        ),
        allocated_profile AS (
        INSERT INTO profiles (profile_name, profile_id)
            SELECT
                $1 profile_name,
                actor_id profile_id
            FROM
                allocated_actor
            RETURNING
                profile_id
                )
        INSERT INTO memberships (parent, child)
        SELECT
            profile_id,
            profile_id
        FROM
            allocated_profile
        RETURNING
            parent;
    `,
      [name],
    );
    return result.rows[0].parent;
  }
}
