import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tblUser', database: 'billcrux_8k' })
export class User {
    @PrimaryColumn({ name: 'userNumber' })
    userNumber: number;

    @Column({ name: 'userId' })
    userId: string;
}