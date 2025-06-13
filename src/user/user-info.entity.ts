import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tblUserInfo', database: 'billcrux_8k' })
export class UserInfo {
    @PrimaryColumn({ name: 'userNumber' })
    userNumber: number;

    @Column({ name: 'userId' })
    userId: string;
}