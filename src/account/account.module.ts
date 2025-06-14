import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './account.entity';
import { AccountService } from './account.service';
import { PasswordService } from './password.service';

@Module({
    imports: [
        TypeOrmModule.forFeature(
            [
                Account
            ],
            'neoimperio'
        )
    ],
    providers: [AccountService, PasswordService],
    exports: [AccountService],
})
export class AccountModule {}