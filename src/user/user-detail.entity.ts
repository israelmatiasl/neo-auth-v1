import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'tblUserDetail', database: 'billcrux_8k' })
export class UserDetail {
    @PrimaryColumn({ name: 'userNumber' })
    userNumber: number;
}