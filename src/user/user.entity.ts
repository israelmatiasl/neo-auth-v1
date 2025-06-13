import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tblUser', database: 'billcrux_8k' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userNumber: number;

    @Column()
    userID: string;
}