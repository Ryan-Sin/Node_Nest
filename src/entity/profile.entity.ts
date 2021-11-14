//Enum 설정
enum STATUS {
  PAUSE = 'PAUSE',
  ACTIVE = 'ACTIVE',
}

import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity({ name: 'profile' })
export class Profile extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 50,
    comment: '유저 권한(Ex: 관리자, 일반 유저 등등)',
  })
  permission: string;

  @Column({
    type: 'enum',
    enum: STATUS,
    default: STATUS.PAUSE,
    comment: '계정상태(ACTIVE, PAUSE)',
  })
  status: string;

  @Column({ type: 'tinyint', width: 1, default: 0, comment: '계정 블락 유무' })
  block: string;

  @Column({
    type: 'date',
    comment: '계정 유효기간(패키지 별 설정) Ex) 2021-12-14',
  })
  account_expired: Date;

  @Column({
    type: 'date',
    comment: '비밀번호 유효기간(주기적 업데이트) Ex) 2021-12-14',
  })
  password_expired: Date;

  @CreateDateColumn({ name: 'create_at', comment: '생성일' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'update_at', comment: '수정일' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'delete_at', comment: '삭제일' })
  deletedAt?: Date | null;
}
