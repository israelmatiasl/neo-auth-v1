import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tblUserDetail', database: 'billcrux_8k' })
export class UserDetail {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userNumber: number;
}