import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UsePipes,
  ParseIntPipe,
  ValidationPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get() //경로를 설정하지 않으면 "user/" 경로로 설정이 된다.
  getHelloWorld(): string {
    return this.userService.getHelloWorld();
  }

  /**
   * @author Ryan
   * @description @Body 방식 - @Body 어노테이션 여러개를 통해 요청 객체를 접근할 수 있습니다.
   *
   * CreateUserDto를 사용해서 @Body 전달 방식을 변경합니다.
   *
   * @param id 유저 고유 아이디
   * @param name 유저 이름
   */
  @Post('/create_user')
  @UsePipes(ValidationPipe)
  onCreateUser(@Body() createUserDto: CreateUserDto): User[] {
    return this.userService.onCreateUser(createUserDto);
  }

  /**
   * @author Ryan
   * @description 전체 유저 조회
   */
  @Get('/user_all')
  getUserAll(): User[] {
    return this.userService.getUserAll();
  }

  /**
   * @author Ryan
   * @description @Query 방식 - 단일 유저 조회
   *
   * @param id 유저 고유 아이디
   */
  @Get('/user')
  findByUserOne1(
    @Query('id', new DefaultValuePipe(1), ParseIntPipe) id: number,
  ): User {
    return this.userService.findByUserOne(id);
  }

  /**
   * @author Ryan
   * @description @Param 방식 - 단일 유저 조회
   *
   * @param id 유저 고유 아이디
   */
  @Get('/user/:id')
  findByUserOne2(@Param('id', ParseIntPipe) id: number): User {
    return this.userService.findByUserOne(id);
  }

  /**
   * @author Ryan
   * @description @Param & @Body 혼합 방식 - 단일 유저 수정
   *
   * @param id 유저 고유 아이디
   * @param name 유저 이름
   */
  @Patch('/user/:id')
  @UsePipes(ValidationPipe)
  setUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): User {
    return this.userService.setUser(id, updateUserDto);
  }

  /**
   * @author Ryan
   * @description @Param & @Body 혼합 방식 - 전체 유저 수정
   *
   * @param id 유저 고유 아이디
   * @param updateUserDto 유저 정보
   */
  @Put('/user/update')
  @UsePipes(ValidationPipe)
  setAllUser(@Body() updateUserDto: UpdateUserDto): User[] {
    return this.userService.setAllUser(updateUserDto);
  }

  /**
   * @author Ryan
   * @description @Query 방식 - 단일 유저 삭제
   *
   * @param id 유저 고유 아이디
   */
  @Delete('/user/delete')
  deleteUser(@Query('id', ParseIntPipe) id: number): User[] {
    return this.userService.deleteUser(id);
  }
}
