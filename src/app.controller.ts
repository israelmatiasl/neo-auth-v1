import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateAccountDto } from './account/dto/create-account.dto';

@Controller('account')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('signup')
  signup(@Body() account: CreateAccountDto): any {
    return this.appService.registerAccount(account);
  }

  
}
