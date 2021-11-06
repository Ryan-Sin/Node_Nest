import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getHelloWorld(): string {
    return 'Hello World!!';
  }
}
