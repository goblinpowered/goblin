import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Pool } from 'pg';
import {
  CreateResourceRequest,
  CreateResourceResponse,
} from '../proto/authservice';

@Controller()
export class CreateResourceController {
  constructor(@Inject('POSTGRES') private pool: Pool) {}

  @GrpcMethod('FramesystemAuthService', 'CreateResource')
  async execute(
    request: CreateResourceRequest,
  ): Promise<CreateResourceResponse> {
    let id: string;
    if (request.id) {
      await this.pool.query(
        `INSERT INTO resources (resource_id, resource_type)
            VALUES ($1::uuid, $2)`,
        [request.id, request.type],
      );
      id = request.id;
    } else {
      const result = await this.pool.query(
        `INSERT INTO resources (resource_type) 
            VALUES ($1) 
            RETURNING *`,
        [request.type],
      );
      id = result.rows[0].resource_id;
    }

    await this.pool.query(
      `INSERT INTO memberships (parent, child) VALUES ($1, $1)`,
      [id],
    );

    return CreateResourceResponse.fromPartial({ id });
  }
}
