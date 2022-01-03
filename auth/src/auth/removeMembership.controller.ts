import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  RemoveMembershipRequest,
  RemoveMembershipResponse,
} from '../proto/authservice';
import { PostgresService } from '../services/postgres/postgres.service';

@Controller()
export class RemoveMembershipController {
  constructor(private postgres: PostgresService) {}

  @GrpcMethod('FramesystemAuthService', 'RemoveMembership')
  async execute(
    request: RemoveMembershipRequest,
  ): Promise<RemoveMembershipResponse> {
    return RemoveMembershipResponse.fromPartial({});
  }
}
