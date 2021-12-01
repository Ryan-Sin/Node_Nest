import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/repository/user.repository';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { User } from 'src/entity/user.entity';
import { uploadFileURL } from 'src/utils/multer.options';
import * as fs from 'fs';
import { extname } from 'path';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}

  /**
   * @author Ryan
   * @description 유저 생성
   *
   * @param createUserDto 유저 데이터
   *
   * @returns {User[]} users
   */
  onCreateUser(createUserDto: CreateUserDto): Promise<boolean> {
    return this.userRepository.onCreate(createUserDto);
  }

  /**
   * @author Ryan
   * @description 모든 유저 조회
   *
   * @returns {User[]} users
   */
  getUserAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  /**
   * @author Ryan
   * @description 단일 유저 조회
   *
   * @param id 유저 고유 아이디
   * @returns {User} users
   */
  findByUserOne(id: string): Promise<User> {
    return this.userRepository.findById(id);
  }

  /**
   * @author Ryan
   * @description 단일 유저 수정
   *
   * @param id 유저 고유 아이디
   * @param updateUserDto 유저 정보
   *
   * @returns {Promise<boolean>} true
   */
  setUser(id: string, updateUserDto: UpdateUserDto): Promise<boolean> {
    return this.userRepository.onChnageUser(id, updateUserDto);
  }

  /**
   * @author Ryan
   * @description 전체 유저 수정
   *
   * @param updateUserDto 유저 정보
   *
   * @returns {Promise<boolean>} true
   */
  setAllUser(updateUserDto: UpdateUserDto[]): Promise<boolean> {
    return this.userRepository.onChnageUsers(updateUserDto);
  }

  /**
   * @author Ryan
   * @description 유저 삭제
   *
   * @param id
   * @returns {Promise<boolean>} true
   */
  deleteUser(id: string): Promise<boolean> {
    return this.userRepository.onDelete(id);
  }

  getHelloWorld(): string {
    return 'Hello World!!';
  }

  /**
   * @author Ryan
   * @description 디스크 방식 파일 업로드 (1)
   *
   * @param files 파일 데이터
   * @returns {String[]} 파일 경로
   */
  uploadFileDisk(files: File[]): string[] {
    return files.map((file: any) => {
      //파일 이름 반환
      return uploadFileURL(file.filename);
    });
  }

  /**
   * @author Ryan
   * @description 디스크 방식 파일 업로드 (2)
   *
   * @param user_id 유저 아이디
   * @param files 파일 데이터
   * @returns {String[]} 파일 경로
   */
  uploadFileDiskDestination(user_id: string, files: File[]): string[] {
    //유저별 폴더 생성
    const uploadFilePath = `uploads/${user_id}`;

    if (!fs.existsSync(uploadFilePath)) {
      // uploads 폴더가 존재하지 않을시, 생성합니다.
      fs.mkdirSync(uploadFilePath);
    }
    return files.map((file: any) => {
      //파일 이름
      const fileName = Date.now() + extname(file.originalname);
      //파일 업로드 경로
      const uploadPath =
        __dirname + `/../../${uploadFilePath + '/' + fileName}`;

      //파일 생성
      fs.writeFileSync(uploadPath, file.path); // file.path 임시 파일 저장소

      return uploadFileURL(uploadFilePath + '/' + fileName);
    });
  }

  /**
   * @author Ryan
   * @description 메모리 방식 파일 업로드
   *
   * @param user_id 유저 아이디
   * @param files 파일 데이터
   * @returns {String[]} 파일 경로
   */
  uploadFileMemory(user_id: string, files: File[]): any {
    //유저별 폴더 생성
    const uploadFilePath = `uploads/${user_id}`;

    if (!fs.existsSync(uploadFilePath)) {
      // uploads 폴더가 존재하지 않을시, 생성합니다.
      fs.mkdirSync(uploadFilePath);
    }

    return files.map((file: any) => {
      //파일 이름
      const fileName = Date.now() + extname(file.originalname);
      //파일 업로드 경로
      const uploadPath =
        __dirname + `/../../${uploadFilePath + '/' + fileName}`;

      //파일 생성
      fs.writeFileSync(uploadPath, file.buffer);

      //업로드 경로 반환
      return uploadFileURL(uploadFilePath + '/' + fileName);
    });
  }
}
