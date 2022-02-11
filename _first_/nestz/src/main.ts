import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {NestExpressApplication} from '@nestjs/platform-express';
import {join} from 'path';

async function bootstrap() {

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  //When you use useStaticAssets you don't need to set up a controller, all your files will be served automatically
  app.useStaticAssets(join(__dirname , '..' ,'_test'));
  await app.listen(3005);
}
bootstrap();

// entry file 