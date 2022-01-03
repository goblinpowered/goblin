import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Pool } from 'pg';
import { RevokeRoleRequest, RevokeRoleResponse } from '../proto/authservice';

@Controller()
export class RevokeRoleController {
  constructor(@Inject('POSTGRES') private pool: Pool) {}

  @GrpcMethod('FramesystemAuthService', 'RevokeRole')
  async execute(request: RevokeRoleRequest): Promise<RevokeRoleResponse> {
    await this.pool.query(
      `DELETE FROM roles
      WHERE resource_id = $1
          AND actor_id = $2
          AND resource_role = $3`,
      [request.resource, request.actor, request.role],
    );
    return RevokeRoleResponse.fromPartial({});
  }
}
