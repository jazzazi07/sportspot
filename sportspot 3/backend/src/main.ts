import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { ValidationPipe } from '@/common/pipes/validation.pipe';
import { AllExceptionsFilter } from '@/common/filters/exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  // Enable CORS
  app.enableCors({
    origin: configService.get('CORS_ORIGIN') || 'http://localhost:3001',
    credentials: true,
  });

  // Global pipes
  app.useGlobalPipes(
    new ValidationPipe(),
  );

  // Global filters
  app.useGlobalFilters(new AllExceptionsFilter());

  // Set global prefix
  app.setGlobalPrefix('api');

  const port = Number(process.env.PORT) || configService.get<number>('APP_PORT') || 3000;
  const host = configService.get<string>('APP_HOST') || '0.0.0.0';

  await app.listen(port, host);
  console.log(`🚀 SportSpot API is running on http://${host}:${port}`);
  console.log(`📚 API documentation available at http://${host}:${port}/api`);
}

bootstrap().catch((error) => {
  console.error('Failed to start application:', error);
  process.exit(1);
});
