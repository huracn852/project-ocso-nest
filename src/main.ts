import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
    cors: {
      origin: [
        process.env.ALLOWEDORIGIN ?? 'http://127.0.0.1:3000',
        'http://localhost:3000',
        'http://127.0.0.1:3000',
      ],
      credentials: true,
    }
  });
  app.use(cookieParser());
    const config = new DocumentBuilder()
    .setTitle('Ocso API')
    .setDescription('API for ocso management ')
    .setVersion('1.9')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));
  await app.listen(Number(process.env.APP_PORT ?? 4000));
}
bootstrap();
