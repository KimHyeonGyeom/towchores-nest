import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../../entities/Users';
import { UserRepository } from './user.repository';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AppModule } from '../../app.module';
//import { UserRepository } from './user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  providers: [UserService, UserRepository],
  controllers: [UserController],
})
export class UserModule {}
