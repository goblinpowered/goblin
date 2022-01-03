import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  AddMembershipRequest,
  AddMembershipResponse,
} from '../proto/authservice';
import { PostgresService } from '../services/postgres/postgres.service';

@Controller()
export class AddMembershipController {
  constructor(private postgres: PostgresService) {}

  @GrpcMethod('FramesystemAuthService', 'AddMembership')
  async execute(request: AddMembershipRequest): Promise<AddMembershipResponse> {
    return AddMembershipResponse.fromPartial({});
  }
}
