import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Category } from './category.entity';

@Entity({ name: 'board' })
export class Board extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  //length 설정하지 않으면 기본 255 길이 설정
  @Column({
    type: 'varchar',
    comment: '게시글 이름',
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 4000,
    comment: '게시글 내용',
  })
  content: string;

  @Column({
    type: 'int',
    default: 0,
    comment: '게시글 조회수',
  })
  view: number;

  @CreateDateColumn({ name: 'create_at', comment: '생성일' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'update_at', comment: '수정일' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'delete_at', comment: '삭제일' })
  deletedAt?: Date | null;

  @ManyToMany(() => Category)
  @JoinTable()
  category: Category;
}
