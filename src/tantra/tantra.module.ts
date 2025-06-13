import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TantraItem } from './tantra-item.entity';
import { TantraService } from './tantra.service';

@Module({
    imports: [
        TypeOrmModule.forFeature(
            [
                TantraItem
            ],
            'tantra'
        )
    ],
    providers: [ TantraService ],
    exports: [ TantraService ],
})
export class TantraModule {}