import { Module, Scope } from '@nestjs/common';
import { ResourcesService } from './resources/resources.service';
import { ProfilesService } from './profiles/profiles.service';
import { GroupsService } from './groups/groups.service';
import { Pool } from 'pg';

const Database = {
  provide: Pool,
  useClass: Pool,
  scope: Scope.DEFAULT,
};

@Module({
  providers: [ResourcesService, ProfilesService, GroupsService, Database],
  exports: [ResourcesService, ProfilesService, GroupsService, Database],
})
export class DataModule {}
