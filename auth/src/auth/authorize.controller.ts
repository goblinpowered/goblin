import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AuthorizeRequest, AuthorizeResponse } from '../proto/authservice';
import { FirebaseService } from '../services/firebase/firebase.service';
import { PostgresService } from '../services/postgres/postgres.service';

@Controller('authorize')
export class AuthorizeController {
  constructor(
    private postgres: PostgresService,
    private firebase: FirebaseService,
  ) {}

  @GrpcMethod('FramesystemAuthService', 'Authorize')
  async authorize(request: AuthorizeRequest): Promise<AuthorizeResponse> {
    const oid = await this.firebase.verifyToken(request.token);
    const checks = await Promise.all([
      this.postgres.isAuthorized({
        actor: request.profile,
        resource: request.resource,
        role: request.role,
      }),
      this.postgres.isAuthorized({
        actor: request.user,
        resource: request.profile,
        role: 'actor',
      }),
      this.postgres.isAuthenticated({
        user: request.user,
        token: oid,
      }),
    ]);
    return {
      authorized: checks.every((v) => v),
    };
  }
}
