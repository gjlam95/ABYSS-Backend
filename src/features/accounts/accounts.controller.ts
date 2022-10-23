import {
  Body,
  Controller,
  Delete,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dtos/create-account.dto';

@Controller('/accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post('/createAccount')
  async createAccount(@Body() createAccountDto: CreateAccountDto) {
    const { password, roles, username } = createAccountDto;
    await this.accountsService.createAccount(username, password, roles);
    return HttpStatus.CREATED;
  }

  @Delete('/deleteAccount/:accountId')
  async deleteAccount(@Param('accountId') accountId: string) {
    await this.accountsService.deleteAccount(accountId);
    return HttpStatus.OK;
  }
}
