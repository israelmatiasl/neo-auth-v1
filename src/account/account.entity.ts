import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Cuentas')
export class Account {
  @PrimaryGeneratedColumn({ name: 'CuentaID' })
  accountId: number;

  @Column({ name: 'UserID' })
  userId: string;

  @Column({ name: 'Hash' })
  hash: string;

  @Column({ name: 'Password' })
  password: string;

  @Column({ name: 'Email' } )
  email: string;

  @Column({ name: 'Nombre' })
  name: string;

  @Column({ name: 'Apellido' })
  surname: string;
}