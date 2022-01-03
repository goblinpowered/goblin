import { Module } from '@nestjs/common';
import { ServicesModule } from '../services/services.module';
import { AddMembershipController } from './addMembership.controller';
import { AuthenticateController } from './authenticate.controller';
import { AuthorizeController } from './authorize.controller';
import { CreateResourceController } from './createResource.controller';
import { GrantRoleController } from './grantRole.controller';
import { RemoveMembershipController } from './removeMembership.controller';
import { RevokeRoleController } from './revokeRole.controller';

@Module({
  imports: [ServicesModule],
  controllers: [
    AddMembershipController,
    AuthenticateController,
    AuthorizeController,
    CreateResourceController,
    GrantRoleController,
    RemoveMembershipController,
    RevokeRoleController,
  ],
})
export class AuthModule {}
