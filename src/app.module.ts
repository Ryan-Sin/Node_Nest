import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';

import { UserModule } from './user/user.module';
import { AuthMiddleware } from './middleware/auth.middleware';
import { UserController } from './user/user.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig), // TypeORM 설정 파일 연결
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      //exclude 함수는 제외 하고싶은 라우터를 등록합니다.
      .exclude({ path: 'user/create_user', method: RequestMethod.POST }) // 유저 생성
      .exclude({ path: 'user/user_all', method: RequestMethod.GET }) // 유저 전체 조회
      .forRoutes(UserController); // 1.유저 컨트롤러 등록
    // .forRoutes('user'); // 2.유저 컨트롤러 경로 등록 -> 위 1번과 동일
  }
}
