import { Injectable } from '@nestjs/common';

const users: User[] = [
  { id: 1, name: '유저1' },
  { id: 2, name: '유저2' },
  { id: 3, name: '유저3' },
];

@Injectable()
export class UserService {
  /**
   * @author Ryan
   * @description 유저 생성
   *
   * @param id 유저 고유 아이디
   * @param name 유저 이름
   * @returns {User[]} users
   */
  onCreateUser(id: number, name: string): User[] {
    return users.concat({ id, name });
  }

  /**
   * @author Ryan
   * @description 모든 유저 조회
   *
   * @returns {User[]} users
   */
  getUserAll(): User[] {
    return users;
  }

  /**
   * @author Ryan
   * @description 단일 유저 조회
   *
   * @param id 유저 고유 아이디
   * @returns {User} users
   */
  findByUserOne(id: number): User {
    return users.find((data) => data.id == id);
  }

  /**
   * @author Ryan
   * @description 단일 유저 수정
   *
   * @returns {User} users
   */
  setUser(id: number, name: string): User {
    return users.find((data) => {
      if (data.id == id) return (data.name = name);
    });
  }

  /**
   * @author Ryan
   * @description 전체 유저 수정
   *
   * @returns {User[]} users
   */
  setAllUser(id, name): User[] {
    return users.map((data) => {
      if (data.id == id) {
        data.name = name;
      }

      return {
        id: data.id,
        name: data.name,
      };
    });
  }

  /**
   * @author Ryan
   * @description 유저 삭제
   *
   * @param id
   * @returns {User[]} users
   */
  deleteUser(id: number): User[] {
    return users.filter((data) => data.id != id);
  }

  getHelloWorld(): string {
    return 'Hello World!!';
  }
}
