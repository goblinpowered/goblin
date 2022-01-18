import { Module } from '@nestjs/common';
import { Pool } from 'pg';
import { createClient } from 'redis';

@Module({
  providers: [
    { provide: 'POSTGRES', useClass: Pool },
    // {
    //   provide: 'REDIS',
    //   useFactory: async () => {
    //     const client = createClient({
    //       socket: {
    //         host: process.env.REDISHOST,
    //       },
    //     });
    //     await client.connect();
    //     return client;
    //   },
    // },
  ],
  exports: ['POSTGRES'],
})
export class ServicesModule {}
