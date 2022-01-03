import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Pool } from 'pg';
import { GrantRoleRequest, GrantRoleResponse } from '../proto/authservice';

@Controller()
export class GrantRoleController {
  constructor(@Inject('POSTGRES') private pool: Pool) {}

  @GrpcMethod('FramesystemAuthService', 'GrantRole')
  async execute(request: GrantRoleRequest): Promise<GrantRoleResponse> {
    await this.pool.query(
      `INSERT INTO roles (resource_id, actor_id, resource_role)
          VALUES ($1, $2, $3);`,
      [request.resource, request.actor, request.role],
    );

    return GrantRoleResponse.fromPartial({});
  }
}
