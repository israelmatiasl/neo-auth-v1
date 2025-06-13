import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity({ name: 'TantraItem', database: 'tantra_azteca' })
export class TantraItem {
    @PrimaryGeneratedColumn()
    id: number; // Asumido si tienes un ID interno. Si no, omítelo.

    @Column()
    Account: string;

    @Column()
    ItemIndex: number;

    @Column({ default: 0 })
    ItemCount: number;

    @Column({ default: 0 })
    Regalo: number;

    @CreateDateColumn({ type: 'datetime', name: 'Fecha' })
    Fecha: Date;
}