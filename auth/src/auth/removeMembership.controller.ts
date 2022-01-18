import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Pool } from 'pg';
import {
  RemoveMembershipRequest,
  RemoveMembershipResponse,
} from '../proto/authservice';

@Controller()
export class RemoveMembershipController {
  constructor(@Inject('POSTGRES') private pool: Pool) {}

  @GrpcMethod('FramesystemAuthService', 'RemoveMembership')
  async execute(
    request: RemoveMembershipRequest,
  ): Promise<RemoveMembershipResponse> {
    await this.pool.query(
      `DELETE FROM memberships
         WHERE parent = $1
         AND child = $2;`,
      [request.parent, request.child],
    );
    return RemoveMembershipResponse.fromPartial({});
  }
}
