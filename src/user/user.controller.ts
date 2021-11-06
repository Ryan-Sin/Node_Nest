import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  @Get() //경로를 설정하지 않으면 "user/" 경로로 설정이 된다.
  getHelloWorld(): string {
    return this.userService.getHelloWorld();
  }
}
