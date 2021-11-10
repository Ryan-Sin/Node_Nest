import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

/**
 * @description SRP를 위반하는 구조이지만 테스트용으로 한 파일에 두 클래스를 선언했다.
 *
 * SRP란: 한 클래스는 하나의 책임만 가져야한다. (단일 책임의 원칙)
 */
export class CreateUserDto {
  @IsNumber()
  @IsNotEmpty()
  id: number; // 유저 고유 아이디

  @IsString()
  @IsNotEmpty()
  name: string; // 유저 이름
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
