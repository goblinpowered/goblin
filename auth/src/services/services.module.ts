import { Module } from '@nestjs/common';
import { Pool } from 'pg';
import { createClient } from 'redis';
import { PostgresService } from './postgres/postgres.service';
import { FirebaseService } from './firebase/firebase.service';

@Module({
  providers: [
    { provide: PostgresService, useClass: PostgresService },
    { provide: 'POSTGRES', useClass: Pool },
    {
      provide: 'REDIS',
      useFactory: async () => {
        const client = createClient({
          socket: {
            host: process.env.REDISHOST,
          },
        });
        await client.connect();
        return client;
      },
    },
    FirebaseService,
  ],
})
export class ServicesModule {}
