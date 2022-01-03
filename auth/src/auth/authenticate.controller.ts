import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Pool } from 'pg';
import {
  AuthenticateRequest,
  AuthenticateResponse,
} from '../proto/authservice';

@Controller()
export class AuthenticateController {
  constructor(@Inject('POSTGRES') private pool: Pool) {}

  @GrpcMethod('FramesystemAuthService', 'Authenticate')
  async execute(request: AuthenticateRequest): Promise<AuthenticateResponse> {
    const result = await this.pool.query(
      `SELECT
        *
      FROM
        authn
      WHERE
        user_id = $1
        AND oid = $2`,
      [request.user, request.token],
    );
    return AuthenticateResponse.fromPartial({
      authenticated: result.rowCount > 0,
    });
  }
}
