import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  lastname: string;

  @Column({ type: 'text', nullable: true })
  image: string;

  @Column({ type: 'text', unique: true })
  email: string;

  @Column({ type: 'int', unique: true, nullable: true })
  phone: number;

  @Column({ type: 'text' })
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
