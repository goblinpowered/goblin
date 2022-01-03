import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  CreateResourceRequest,
  CreateResourceResponse,
} from '../proto/authservice';
import { PostgresService } from '../services/postgres/postgres.service';

@Controller()
export class CreateResourceController {
  constructor(private postgres: PostgresService) {}

  @GrpcMethod('FramesystemAuthService', 'CreateResource')
  async execute(
    request: CreateResourceRequest,
  ): Promise<CreateResourceResponse> {
    return CreateResourceResponse.fromPartial({});
  }
}
