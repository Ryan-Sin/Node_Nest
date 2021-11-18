import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/auth.local.strategy';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/repository/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository]), PassportModule],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
