import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tblUserInfo', database: 'billcrux_8k' })
export class UserInfo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userNumber: number;

    @Column()
    userID: string;
}