import { Module } from '@nestjs/common';
import { ServicesModule } from 'src/services/services.module';
import { AuthorizeController } from './authorize.controller';

@Module({
  imports: [ServicesModule],
  controllers: [AuthorizeController],
})
export class AuthModule {}
