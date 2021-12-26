import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class SignInDto {
  @ApiProperty({
    example: 'Ryan',
    description: '유저 아이디',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  user_id: string;

  @ApiProperty({
    example: '1234qweR!!',
    description: '유저 비밀번호',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  // 최소 8자 및 최대 16자 하나의 소문자, 하나의 숫자 및 하나의 특수 문자
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d~!@#$%^&*()+|=]{8,16}$/, {
    message: '비밀번호 양식에 맞게 작성하세요.',
  })
  password: string;
}
