import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Unique,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { CompanyInformation } from './company_infomation.entity';
import { Profile } from './profile.entity';

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

  /**
   * 1 : 1 관계 설정
   * @OneToOne -> 해당 엔티티(User) To 대상 엔티티(Profile)
   *              하나의 유저는 하나의 개인정보를 갖는다.
   */
  @OneToOne(() => Profile)
  @JoinColumn({ name: 'profile_id' })
  profile: Profile;

  /**
   * 1 : M 관계 설정
   * @ManyToOne -> 해당 엔티티(User) To 대상 엔티티(CompanyInformation)
   *               여러 유저는 하나의 회사에 소속
   */
  @ManyToOne(
    () => CompanyInformation,
    (comapnyInformation) => comapnyInformation.userId,
  )
  @JoinColumn({ name: 'company_id' })
  companyInformation: CompanyInformation;
}
