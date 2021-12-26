import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

/**
 * @description SRP를 위반하는 구조이지만 테스트용으로 한 파일에 두 클래스를 선언했다.
 *
 * SRP란: 한 클래스는 하나의 책임만 가져야한다. (단일 책임의 원칙)
 */
export class CreateUserDto {
  @ApiProperty({
    example: 'Ryan',
    description: '유저 아이디',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  user_id: string; // 유저 아이디

  @ApiProperty({
    example: '1234qweR!!',
    description: '유저 비밀번호',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(16)
  // 최소 8자 및 최대 16자, 하나 이상의 대문자, 하나의 소문자, 하나의 숫자 및 하나의 특수 문자
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/,
    {
      message: '비밀번호 양식에 맞게 작성하세요.',
    },
  )
  password: string; //유저 비밀번호

  @ApiProperty({
    example: 'Ryan',
    description: '유저 이름',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string; // 유저 이름

  @ApiProperty({
    example: '25',
    description: '유저 나이',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  age: number; //유저 나이
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  id: string;
}
