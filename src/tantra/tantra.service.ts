import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TantraItem } from './tantra-item.entity';

@Injectable()
export class TantraService {
    constructor(
        @InjectRepository(TantraItem, 'tantra')
        private readonly tantraRepo: Repository<TantraItem>,
    ) {}

    async addStarterItem(username: string, itemIndex = 8783): Promise<void> {
        const item = this.tantraRepo.create({
            account: username,
            itemIndex: itemIndex
        });

        await this.tantraRepo.save(item);
    }
}