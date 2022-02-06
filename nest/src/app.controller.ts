import { Controller, Get,  Redirect } from '@nestjs/common';
import { AppService } from './app.service';
import { Header  } from '@nestjs/common';
import { Query } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  // @Get('docs')
  // @Redirect('https://docs.nestjs.com', 302)
  // getDocs(@Query('version') version) {
  //   if (version && version === '5') {
  //     return { url: 'https://docs.nestjs.com/v5/' };
  //   }
  // }
  
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}


//hanfl respomse amd requests