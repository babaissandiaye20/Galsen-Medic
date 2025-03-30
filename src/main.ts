import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationService } from './validation/validation.service';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AsyncContextInterceptor } from './async-context/async-context.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Récupération de l'instance de ValidationService
  const validationService = app.get(ValidationService);
  app.useGlobalPipes(validationService);

  // Utilisation d'assets statiques pour la documentation
  app.useStaticAssets(join(__dirname, '..', 'documentation'), {
    prefix: '/docs',
  });

  // Configuration Swagger avec Bearer Token
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
      'access-token'
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Remplacez le middleware par l'interceptor qui définit le contexte après authentification
  // main.ts (global interceptor)
  app.useGlobalInterceptors(new AsyncContextInterceptor());

  app.enableCors({
    origin: '*', // ← pour tests. En prod, remplace par les vraies URLs (ex: ['http://localhost:35859'])
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000,'0.0.0.0');
}

bootstrap();
