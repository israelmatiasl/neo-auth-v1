import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity({ name: 'TantraItem', database: 'tantra_azteca' })
export class TantraItem {
    @PrimaryGeneratedColumn({ name: 'ID' })
    id: number;

    @Column({ name: 'World' })
    world: number;

    @Column({ name: 'Account' })
    account: string;

    @Column({ name: 'ItemIndex' })
    itemIndex: number;

    @Column({ name: 'ItemCount', default: 0 })
    itemCount: number;

    @Column({ name: 'Regalo', default: 0 })
    regalo: number;

    @CreateDateColumn({ type: 'datetime', name: 'Fecha' })
    fecha: Date;
}