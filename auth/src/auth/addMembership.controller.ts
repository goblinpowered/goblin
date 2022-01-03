import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Pool } from 'pg';
import {
  AddMembershipRequest,
  AddMembershipResponse,
} from '../proto/authservice';

@Controller()
export class AddMembershipController {
  constructor(@Inject('POSTGRES') private pool: Pool) {}

  @GrpcMethod('FramesystemAuthService', 'AddMembership')
  async execute(request: AddMembershipRequest): Promise<AddMembershipResponse> {
    await this.pool.query(
      `INSERT INTO memberships (parent, child)
          VALUES ($1, $2)`,
      [request.parent, request.child],
    );
    return AddMembershipResponse.fromPartial({});
  }
}
