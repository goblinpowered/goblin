import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { RevokeRoleRequest, RevokeRoleResponse } from '../proto/authservice';
import { PostgresService } from '../services/postgres/postgres.service';

@Controller()
export class RevokeRoleController {
  constructor(private postgres: PostgresService) {}

  @GrpcMethod('FramesystemAuthService', 'RevokeRole')
  async execute(request: RevokeRoleRequest): Promise<RevokeRoleResponse> {
    return RevokeRoleResponse.fromPartial({});
  }
}
