import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Pool } from 'pg';
import { AuthorizeRequest, AuthorizeResponse } from '../proto/authservice';
import { FirebaseService } from '../services/firebase/firebase.service';
import { PostgresService } from '../services/postgres/postgres.service';

@Controller('authorize')
export class AuthorizeController {
  constructor(@Inject('POSTGRES') private pool: Pool) {}

  @GrpcMethod('FramesystemAuthService', 'Authorize')
  async execute(request: AuthorizeRequest): Promise<AuthorizeResponse> {
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
      [request.role, request.actor, request.resource],
    );
    return {
      authorized: result.rowCount > 0,
    };
  }
}
