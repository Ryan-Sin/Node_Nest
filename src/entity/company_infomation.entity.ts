import { IsEmail } from 'class-validator';
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'company_information' })
export class CompanyInformation extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  //length 설정하지 않으면 기본 255 길이 설정
  @Column({
    type: 'varchar',
    comment: '회사 이름',
  })
  hospital_name: string;

  @IsEmail()
  @Column({
    type: 'varchar',
    length: 50,
    comment: '회사 이메일',
  })
  email: string;

  @Column({ type: 'varchar', length: 50, comment: '회사 관리자 이름' })
  name: string;

  @Column({
    type: 'varchar',
    length: 72,
    comment: '회사 전화번호',
  })
  phone: string;

  @Column({
    type: 'varchar',
    length: 72,
    comment: '팩스번호',
  })
  fax: string;

  @Column({
    type: 'varchar',
    length: 45,
    name: 'business_number',
    comment: '사업자등록 번호',
  })
  business_number: string;

  @Column({
    type: 'text',
    comment: '주소',
  })
  address: string;

  @Column({
    type: 'text',
    comment: '상세주소',
  })
  detail_address: string;

  @CreateDateColumn({ name: 'create_at', comment: '생성일' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'update_at', comment: '수정일' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'delete_at', comment: '삭제일' })
  deletedAt?: Date | null;

  /**
   * 1 : M 관계 설정
   * @OneToMany -> 해당 엔티티(CompanyInformation) To 대상 엔티티 (User)
   */
  @OneToMany(() => User, (user) => user.id)
  userId: User[];
}
