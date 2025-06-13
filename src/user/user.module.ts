import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserDetail } from './user-detail.entity';
import { UserInfo } from './user-info.entity';
import { UserService } from './user.service';

@Module({
    imports: [
        TypeOrmModule.forFeature(
            [
                User,
                UserDetail,
                UserInfo
            ],
            'billcrux'
        )
    ],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {}