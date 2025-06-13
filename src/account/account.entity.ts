import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Cuentas')
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'UserID' })
  userID: string;

  @Column()
  hash: string; // Hashed password

  @Column()
  password: string; // MD5 password original

  @Column()
  email: string;

  @Column({ name: 'Nombre' })
  name: string;

  @Column({ name: 'Apellido' })
  surname: string;
}