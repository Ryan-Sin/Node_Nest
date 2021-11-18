import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/repository/user.repository';

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository) {}

  /**
   * @author Ryan
   * @description 단일 유저 조회
   *
   * @param user_id 유저 아이디
   * @param password 유저 비밀번호
   * @returns User
   */
  async validateUser(user_id: string, password: string): Promise<any> {
    console.log('AuthService');

    const user = await this.userRepository.findByLogin(user_id, password);

    //사용자가 요청한 비밀번호와 DB에서 조회한 비밀번호 일치여부 검사
    if (user && user.password === password) {
      const { password, ...result } = user;

      //비밀번호를 제외하고 유저 정보를 반환
      return result;
    }
    return null;
  }
}
