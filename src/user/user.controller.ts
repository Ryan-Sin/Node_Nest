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
  ValidationPipe,
  ParseUUIDPipe,
  UseGuards,
  Request,
  HttpStatus,
  Res,
  UseFilters,
  UseInterceptors,
  UploadedFiles,
  Bind,
} from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { User } from 'src/entity/user.entity';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { HttpExceptionFilter } from 'src/utils/http-exception.filter';
import { FilesInterceptor } from '@nestjs/platform-express';
import {
  multerDiskOptions,
  multerDiskDestinationOutOptions,
  multerMemoryOptions,
} from 'src/utils/multer.options';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { SignInDto } from './dto/sign_in.dto';

let userId = '';
@Controller('user')
@ApiTags('User') // Swagger Tage 설정
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get() //경로를 설정하지 않으면 "user/" 경로로 설정이 된다.
  @UseFilters(new HttpExceptionFilter())
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
  @ApiOperation({
    summary: '유저 생성',
    description: '유저 생성 API',
  })
  @ApiCreatedResponse({
    description: '성공여부',
    schema: {
      example: { success: true },
    },
  })
  onCreateUser(@Res() res: Response, @Body() createUserDto: CreateUserDto) {
    return this.userService.onCreateUser(createUserDto).then((result) => {
      res.status(HttpStatus.OK).json({ success: result });
    });
  }

  /**
   * @author Ryan
   * @description 전체 유저 조회
   */
  @Get('/user_all')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token') //JWT 토큰 키 설정
  @ApiOperation({
    summary: '전체 유저 조회',
    description: '전체 유저 조회 API',
  })
  @ApiCreatedResponse({
    description: '성공여부',
    schema: {
      example: {
        success: true,
        data: [
          {
            id: 'cea1d926-6f1b-4a37-a46c-8ddf0b17a0bc',
            user_id: 'Ryan',
            password: '1234qweR!!',
            salt: '임시',
            name: 'Ryan',
            age: 25,
            createdAt: '2021-12-25T23:30:51.371Z',
            updatedAt: '2021-12-25T23:30:51.371Z',
            deletedAt: null,
          },
        ],
      },
    },
  })
  getUserAll(@Res() res: Response) {
    return this.userService.getUserAll().then((result) => {
      res.status(HttpStatus.OK).json({ success: true, data: result });
    });
  }

  /**
   * @author Ryan
   * @description @Query 방식 - 단일 유저 조회
   *
   * @param id 유저 고유 아이디
   */
  @Get('/user')
  findByUserOne1(@Query('id', ParseUUIDPipe) id: string): Promise<User> {
    return this.userService.findByUserOne(id);
  }

  /**
   * @author Ryan
   * @description @Param 방식 - 단일 유저 조회
   *
   * @param id 유저 고유 아이디
   */
  @Get('/user/:id')
  findByUserOne2(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
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
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<boolean> {
    return this.userService.setUser(id, updateUserDto);
  }

  /**
   * @author Ryan
   * @description @Body 방식 - 전체 유저 수정
   *
   * @param updateUserDto 유저 정보
   */
  @Put('/user/update')
  @UsePipes(ValidationPipe)
  setAllUser(@Body() updateUserDto: UpdateUserDto[]): Promise<boolean> {
    return this.userService.setAllUser(updateUserDto);
  }

  /**
   * @author Ryan
   * @description @Query 방식 - 단일 유저 삭제
   *
   * @param id 유저 고유 아이디
   */
  @Delete('/user/delete')
  deleteUser(@Query('id', ParseUUIDPipe) id: string): Promise<boolean> {
    return this.userService.deleteUser(id);
  }

  /**
   * @author Ryan
   * @description 로그인
   *
   * @param req Request 데코레이터
   * @returns User
   */
  @Post('/auth/login')
  @UseGuards(LocalAuthGuard)
  @ApiOperation({
    summary: '로그인 API',
    description: '아이디와 비밀번호를 통해 로그인을 진행',
  })
  @ApiCreatedResponse({
    description: '로그인 정보',
    schema: {
      example: {
        id: 'cea1d926-6f1b-4a37-a46c-8ddf0b17a0bc',
        user_id: 'Ryan',
        salt: '임시',
        name: 'Ryan',
        age: 25,
        createdAt: '2021-12-25T23:30:51.371Z',
        updatedAt: '2021-12-25T23:30:51.371Z',
        deletedAt: null,
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNlYTFkOTI2LTZmMWItNGEzNy1hNDZjLThkZGYwYjE3YTBiYyIsInVzZXJfaWQiOiJSeWFuIiwic2FsdCI6IuyehOyLnCIsIm5hbWUiOiJSeWFuIiwiYWdlIjoyNSwiY3JlYXRlZEF0IjoiMjAyMS0xMi0yNVQyMzozMDo1MS4zNzFaIiwidXBkYXRlZEF0IjoiMjAyMS0xMi0yNVQyMzozMDo1MS4zNzFaIiwiZGVsZXRlZEF0IjpudWxsLCJpYXQiOjE2NDA1MDc0NzMsImV4cCI6MTY0MDUwNzUzM30.gm-Yf_C8szEOvcy-bK-r-CP4Nz6aCr1AgqvH8KonxvU',
      },
    },
  })
  // Swageer API를 사용하기 위해 DTO적용
  async login(@Request() req, @Body() sign_in_dto: SignInDto) {
    console.log('Login Route');

    return req.user;
  }

  /**
   * @author Ryan
   * @description 디스크 방식 파일 업로드 (1)-> Destination 옵션 설정
   *
   * @param {File[]} files 다중 파일
   * @param res Response 객체
   */
  @Post('/disk_upload1')
  @UseInterceptors(FilesInterceptor('files', null, multerDiskOptions))
  @Bind(UploadedFiles())
  uploadFileDisk(files: File[], @Res() res: Response) {
    res.status(HttpStatus.OK).json({
      success: true,
      data: this.userService.uploadFileDisk(files),
    });
  }

  /**
   * @author Ryan
   * @description 디스크 방식 파일 업로드 (2)-> Destination 옵션 미설정
   *
   * @param {File[]} files 다중 파일
   * @param  user_id 유저 아이디
   * @param res Response 객체
   */
  @Post('/disk_upload2')
  @UseInterceptors(
    FilesInterceptor('files', null, multerDiskDestinationOutOptions),
  )
  @Bind(UploadedFiles())
  uploadFileDiskDestination(
    files: File[],
    @Body('user_id') user_id: string,
    @Res() res: Response,
  ) {
    if (user_id != undefined) {
      userId = user_id;
    }

    res.status(HttpStatus.OK).json({
      success: true,
      data: this.userService.uploadFileDiskDestination(userId, files),
    });
  }

  /**
   * @author Ryan
   * @description 메모리 방식 파일 업로드
   *
   * @param {File[]} files 다중 파일
   * @param  user_id 유저 아이디
   * @param res Response 객체
   */
  @Post('/memory_upload')
  @UseInterceptors(FilesInterceptor('files', null, multerMemoryOptions))
  @Bind(UploadedFiles())
  uploadFileMemory(
    files: File[],
    @Body('user_id') user_id: string,
    @Res() res: Response,
  ) {
    if (user_id != undefined) {
      userId = user_id;
    }
    res.status(HttpStatus.OK).json({
      success: true,
      data: this.userService.uploadFileMemory(userId, files),
    });
  }
}
