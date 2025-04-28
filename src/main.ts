import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { RedisService } from './redis/redis.service';
import { AsyncContextInterceptor } from './async-context/async-context.interceptor';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationService } from './validation/validation.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {CacheInterceptor as  CustomCacheInterceptor} from './common/interceptor/cache.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const validationService = app.get(ValidationService);
  app.useGlobalPipes(validationService);

  const redisService = app.get(RedisService);
  const reflector = app.get(Reflector);
  app.useGlobalInterceptors(new  CustomCacheInterceptor(reflector, redisService));
  app.useGlobalInterceptors(new AsyncContextInterceptor());

  app.useStaticAssets(join(__dirname, '..', 'documentation'), {
    prefix: '/docs',
  });

  const config = new DocumentBuilder()
    .setTitle('User Management API')
    .setDescription('API for managing users')
    .setVersion('1.0')
    .addTag('users')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        in: 'header',
      },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap();
