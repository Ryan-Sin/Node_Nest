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

let userId = '';
@Controller('user')
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
  onCreateUser(@Res() res: Response, @Body() createUserDto: CreateUserDto) {
    return this.userService.onCreateUser(createUserDto).then((result) => {
      res.status(HttpStatus.OK).json({ success: result });
    });
  }

  /**
   * @author Ryan
   * @description 전체 유저 조회
   */
  @UseGuards(JwtAuthGuard)
  @Get('/user_all')
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
  @UseGuards(LocalAuthGuard)
  @Post('/auth/login')
  async login(@Request() req) {
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
