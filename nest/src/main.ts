import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {NestExpressApplication} from '@nestjs/platform-express';
import {join} from 'path';

async function bootstrap() {

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname , '..' ,'static'));
  // app.enableCors('localhost:3001');
  await app.listen(3000);
}
bootstrap();




// entry file 