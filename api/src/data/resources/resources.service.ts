import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { ident } from 'pg-format';

export interface ResourceType {
  tableName: string;
  id: string;
  type: string;
}

@Injectable()
export class ResourcesService {
  constructor(private pool: Pool) {}

  async createResource({ tableName, id, type }: ResourceType) {
    const qstring = pgIdent`
    with allocated_resource as (
      insert into resources (resource_type) values ($1) returning resource_id
    )
      insert into ${tableName} (${id}) 
      select * from allocated_resource 
      returning ${id}
    `;
    const result = await this.pool.query(qstring, [type]);
    return result.rows[0][id];
  }
}

function pgIdent(strings: TemplateStringsArray, ...values: string[]) {
  return strings
    .map((str, i) => `${str}${values[i] ? ident(values[i]) : ''}`)
    .join('');
}
