import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Unique,
} from 'typeorm';

@Entity({ name: 'user' })
@Unique(['user_id'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, comment: '유저 아이디' })
  user_id: string;

  @Column({ type: 'varchar', length: 255, comment: '유저 비밀번호' })
  password: string;

  @Column({ type: 'varchar', length: 255, comment: 'salt' })
  salt: string;

  @Column({ type: 'varchar', length: 30, comment: '유저 이름' })
  name: string;

  @Column({ type: 'tinyint', comment: '유저 나이' })
  age: number;

  @CreateDateColumn({ name: 'create_at', comment: '생성일' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'update_at', comment: '수정일' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'delete_at', comment: '삭제일' })
  deletedAt?: Date | null;
}
