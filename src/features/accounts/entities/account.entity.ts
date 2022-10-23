import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum RoleFlags {
  User = 1 << 0,
  Vendor = 1 << 1,
  Admin = (1 << 2) | RoleFlags.User | RoleFlags.Vendor,
}

@Entity()
export class Account extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  username!: string;

  @Column()
  hashedPassword!: string;

  @Column({
    type: 'smallint',
    default: 0,
  })
  roles!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date;
}
