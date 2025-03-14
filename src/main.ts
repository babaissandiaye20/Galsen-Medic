import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationService } from './validation/validation.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Récupération de l'instance de ValidationService
  const validationService = app.get(ValidationService);
  app.useGlobalPipes(validationService);

  // Configuration Swagger
  const config = new DocumentBuilder()
    .setTitle('User Management API')
    .setDescription('API for managing users')
    .setVersion('1.0')
    .addTag('users')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
