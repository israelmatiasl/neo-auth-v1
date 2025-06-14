import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AccountModule } from './account/account.module';
import { UserModule } from './user/user.module';
import { TantraModule } from './tantra/tantra.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './account/account.entity';
import { AppService } from './app.service';
import { User } from './user/user.entity';
import { UserDetail } from './user/user-detail.entity';
import { UserInfo } from './user/user-info.entity';
import { TantraItem } from './tantra/tantra-item.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),

    TypeOrmModule.forRoot({
      name: 'neoimperio',
      type: 'mssql',
      host: process.env.DB_NEO_HOST,
      port: Number(process.env.DB_NEO_PORT),
      username: process.env.DB_NEO_USER,
      password: process.env.DB_NEO_PASS,
      database: process.env.DB_NEO_NAME,
      entities: [Account],
      synchronize: false,
      options: {
        trustServerCertificate: true
      },
    }),

    //TypeOrmModule.forRoot({
    //  name: 'billcrux',
    //  type: 'mssql',
    //  host: process.env.DB_BILL_HOST,
    //  port: Number(process.env.DB_BILL_PORT),
    //  username: process.env.DB_BILL_USER,
    //  password: process.env.DB_BILL_PASS,
    //  database: process.env.DB_BILL_NAME,
    //  entities: [
    //    User,
    //    UserDetail,
    //    UserInfo
    //  ],
    //  synchronize: false,
    //  options: {
    //    trustServerCertificate: true
    //  },
    //}),
//
    //TypeOrmModule.forRoot({
    //  name: 'tantra',
    //  type: 'mssql',
    //  host: process.env.DB_TANTRA_HOST,
    //  port: Number(process.env.DB_TANTRA_PORT),
    //  username: process.env.DB_TANTRA_USER,
    //  password: process.env.DB_TANTRA_PASS,
    //  database: process.env.DB_TANTRA_NAME,
    //  entities: [TantraItem],
    //  synchronize: false,
    //  options: {
    //    trustServerCertificate: true
    //  },
    //}),

    // Módulos funcionales
    AccountModule,
    //UserModule,
    //TantraModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
