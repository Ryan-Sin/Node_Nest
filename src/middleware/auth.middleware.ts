import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // 논리합 연산자 -> 왼쪽 피연산자가 false라면 오른쪽 피연산자가 실행
    const name: string = req.query.name || req.body.name;

    if (name == 'Ryan') {
      next();
    } else {
      // Ryan 유저가 아니라면 허가 받지 않은 유저이기 때문에 401 Error를 반환
      throw new UnauthorizedException();
    }
  }
}
