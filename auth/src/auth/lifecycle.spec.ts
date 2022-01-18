import { Test, TestingModule } from '@nestjs/testing';
import {
  AddMembershipRequest,
  AuthorizeRequest,
  CreateResourceRequest,
  GrantRoleRequest,
  RemoveMembershipRequest,
  RevokeRoleRequest,
} from '../proto/authservice';
import { AuthorizeController } from './authorize.controller';
import { Pool } from 'pg';
import {
  createGroup,
  createResource,
  createProfile,
  grant,
} from '../testing/postgres';
import { AuthModule } from './auth.module';
import { CreateResourceController } from './createResource.controller';
import { AddMembershipController } from './addMembership.controller';
import { GrantRoleController } from './grantRole.controller';
import { RevokeRoleController } from './revokeRole.controller';
import { RemoveMembershipController } from './removeMembership.controller';

describe('Auth Service', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [AuthModule],
    }).compile();
  });

  afterEach(async () => {
    await module.get<Pool>('POSTGRES').end();
  });

  test('works', async () => {
    const parentGroup = await module
      .get<CreateResourceController>(CreateResourceController)
      .execute(
        CreateResourceRequest.fromPartial({
          type: 'group',
        }),
      );

    const childGroup = await module
      .get<CreateResourceController>(CreateResourceController)
      .execute(
        CreateResourceRequest.fromPartial({
          type: 'group',
        }),
      );

    const campaign = await module
      .get<CreateResourceController>(CreateResourceController)
      .execute(
        CreateResourceRequest.fromPartial({
          type: 'campaign',
        }),
      );

    const profile = await module
      .get<CreateResourceController>(CreateResourceController)
      .execute(
        CreateResourceRequest.fromPartial({
          type: 'profile',
        }),
      );

    await module.get<AddMembershipController>(AddMembershipController).execute(
      AddMembershipRequest.fromPartial({
        parent: parentGroup.id,
        child: childGroup.id,
      }),
    );

    await module.get<AddMembershipController>(AddMembershipController).execute(
      AddMembershipRequest.fromPartial({
        parent: childGroup.id,
        child: profile.id,
      }),
    );

    await module.get<GrantRoleController>(GrantRoleController).execute(
      GrantRoleRequest.fromPartial({
        resource: campaign.id,
        role: 'potato',
        actor: parentGroup.id,
      }),
    );

    expect(
      (
        await module.get<AuthorizeController>(AuthorizeController).execute(
          AuthorizeRequest.fromPartial({
            resource: campaign.id,
            actor: profile.id,
            role: 'potato',
          }),
        )
      ).authorized,
    ).toEqual(true);

    await module.get<RevokeRoleController>(RevokeRoleController).execute(
      RevokeRoleRequest.fromPartial({
        resource: campaign.id,
        role: 'potato',
        actor: parentGroup.id,
      }),
    );

    expect(
      (
        await module.get<AuthorizeController>(AuthorizeController).execute(
          AuthorizeRequest.fromPartial({
            resource: campaign.id,
            actor: profile.id,
            role: 'potato',
          }),
        )
      ).authorized,
    ).toEqual(false);

    await module.get<GrantRoleController>(GrantRoleController).execute(
      GrantRoleRequest.fromPartial({
        resource: campaign.id,
        role: 'potato',
        actor: parentGroup.id,
      }),
    );

    expect(
      (
        await module.get<AuthorizeController>(AuthorizeController).execute(
          AuthorizeRequest.fromPartial({
            resource: campaign.id,
            actor: profile.id,
            role: 'potato',
          }),
        )
      ).authorized,
    ).toEqual(true);

    expect(
      (
        await module.get<AuthorizeController>(AuthorizeController).execute(
          AuthorizeRequest.fromPartial({
            resource: campaign.id,
            actor: profile.id,
            role: 'not_potato',
          }),
        )
      ).authorized,
    ).toEqual(false);

    await module
      .get<RemoveMembershipController>(RemoveMembershipController)
      .execute(
        RemoveMembershipRequest.fromPartial({
          parent: parentGroup.id,
          child: childGroup.id,
        }),
      );

    expect(
      (
        await module.get<AuthorizeController>(AuthorizeController).execute(
          AuthorizeRequest.fromPartial({
            resource: campaign.id,
            actor: profile.id,
            role: 'not_potato',
          }),
        )
      ).authorized,
    ).toEqual(false);
  });
});
