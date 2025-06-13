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

    async createUser(userNumber: number, userID: string): Promise<void> {
        // tblUser con autogenerado ID
        const user = this.userRepository.create({ userID, userNumber });
        const savedUser = await this.userRepository.save(user);

        // tblUserDetail usando el ID generado
        const detail = this.userDetailRepository.create({ userNumber: savedUser.id });
        await this.userDetailRepository.save(detail);

        // tblUserInfo usando el ID generado
        const info = this.userInfoRepository.create({ userNumber: savedUser.id, userID });
        await this.userInfoRepository.save(info);
    }
}