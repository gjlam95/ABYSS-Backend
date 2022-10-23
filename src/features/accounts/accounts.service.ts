import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Account } from './entities/account.entity';
import { hashPassword } from '@/utils/hashing.utils';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    private readonly dataSource: DataSource,
  ) {}

  async createAccount(username: string, password: string, roles: number) {
    const newAccount = this.accountRepository.create({ username, roles });
    newAccount.hashedPassword = await hashPassword(password);
    await this.accountRepository.insert(newAccount);
  }

  async findWithUsername(username: string) {
    return this.accountRepository.findOne({
      where: { username },
    });
  }

  async findWithId(id: string) {
    return this.accountRepository.findOne({
      where: { id },
    });
  }

  async deleteAccount(accountId: string) {
    return this.accountRepository.softDelete({ id: accountId });
  }
}
