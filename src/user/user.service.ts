import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserDetail } from './user-detail.entity';
import { UserInfo } from './user-info.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User, 'billcrux')
        private readonly userRepository: Repository<User>,
        @InjectRepository(UserDetail, 'billcrux')
        private readonly userDetailRepository: Repository<UserDetail>,
        @InjectRepository(UserInfo, 'billcrux')
        private readonly userInfoRepository: Repository<UserInfo>,
    ) {}

    async createUser(accountId: number, username: string): Promise<void> {
        const user = this.userRepository.create({
            userNumber: accountId,
            userId: username
        });
        await this.userRepository.save(user);

        
        const detail = this.userDetailRepository.create({ userNumber: accountId });
        await this.userDetailRepository.save(detail);

        
        const info = this.userInfoRepository.create({
            userNumber: accountId,
            userId: username
        });
        await this.userInfoRepository.save(info);
    }
}