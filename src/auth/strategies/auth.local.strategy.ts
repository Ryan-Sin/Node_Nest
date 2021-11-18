import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    // usernaem 키 이름 변경 user_id로 요청
    super({
      usernameField: 'user_id',
    });
  }

  async validate(user_id: string, password: string): Promise<any> {
    console.log('LocalStrategy');

    const user = await this.authService.validateUser(user_id, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
