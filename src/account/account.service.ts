import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Account } from './account.entity';
import * as bcrypt from 'bcrypt';
import md5 from 'md5';

@Injectable()
export class AccountService {
    constructor(
        @InjectRepository(Account, 'neoimperio')
        private readonly accountRepository: Repository<Account>
    ) {}

    async findByUsernameOrEmail(userId: string, email: string): Promise<Account | null> {
        //return this.accountRepository
        //    .createQueryBuilder('account')
        //    .where('account.userID = :userID OR account.email = :email', { userId, email })
        //    .getOne();
        return this.accountRepository.findOne({
            where: [ { userId }, { email } ]
        });
    }
    

    async createAccount(input: {
        username: string;
        password: string;
        email: string;
        name: string;
        surname: string;
    }): Promise<Account> {
        const hashedPassword = await bcrypt.hash(input.password, 10);
        const md5Password = md5(input.password);

        const account = this.accountRepository.create({
            userId: input.username,
            hash: hashedPassword,
            password: md5Password,
            email: input.email,
            name: input.name,
            surname: input.surname,
        });

        return this.accountRepository.save(account);
    }
}