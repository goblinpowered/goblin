import { AuthModule } from './auth/auth.module';
import { NestFactory } from '@nestjs/core';
import { env } from 'process';
import { join } from 'path';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

console.log(env);

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthModule,
    {
      transport: Transport.GRPC,
      options: {
        url: '0.0.0.0:9001',
        package: 'framesystem.auth',
        protoPath: join(__dirname, 'proto/authservice.proto'),
      },
    },
  );
  app.listen();
}
bootstrap();
