import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { GrantRoleRequest, GrantRoleResponse } from '../proto/authservice';
import { PostgresService } from '../services/postgres/postgres.service';

@Controller()
export class GrantRoleController {
  constructor(private postgres: PostgresService) {}

  @GrpcMethod('FramesystemAuthService', 'GrantRole')
  async execute(request: GrantRoleRequest): Promise<GrantRoleResponse> {
    return GrantRoleResponse.fromPartial({});
  }
}
