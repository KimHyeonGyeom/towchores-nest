import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../entities/Users';
import { UserRepository } from './user.repository';
import { JwtModule } from '@nestjs/jwt';
//import { UserRepository } from './user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    JwtModule.register({
      secret: 'jwt secret key',
      signOptions: { expiresIn: 3600 },
    }),
  ],
  providers: [UserService, UserRepository],
  controllers: [UserController],
})
export class UserModule {}
