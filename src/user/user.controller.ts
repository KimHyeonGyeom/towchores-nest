import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
  Request,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UndefinedToNullInterceptor } from '../interceptors/undefinedToNull.interceptor';
import { SignupRequestDto } from './dto/signup.request.dto';
import { ApiOperation } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { LoginRequestDto } from './dto/login.request.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { AuthGuard } from '../auth/auth.guard';

@UseInterceptors(UndefinedToNullInterceptor)
@Controller('api/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/nhc-login')
  @Roles('pass')
  @ApiOperation({ summary: '로그인' })
  async login(@Query() query: LoginRequestDto) {
    const [token, user] = await this.userService.login({
      social_id: query.social_id,
      device_token: query.device_token,
    });

    return {
      token,
      user: user,
    };
  }

  @Post('/')
  @Roles('pass')
  @UseInterceptors(FileInterceptor('')) //postman form-data에서도 사용할 수 있도록 하기위해 추가
  @ApiOperation({ summary: '회원가입' })
  async signUp(@Body() body: SignupRequestDto) {
    const user = await this.userService.signUp({
      nickname: body.nickname,
      social_id: body.social_id,
      social_type: body.social_type,
      latitude: body.latitude,
      longitude: body.longitude,
    });
    return { user: user };
  }

  @Put('/')
  @UseInterceptors(FileInterceptor('image'))
  @ApiOperation({ summary: '유저 수정' })
  async updateUserProfile(@Request() req, @UploadedFile() file) {
    const user_id = req.token_user_id;
    const image = file;

    const user = await this.userService.updateUser({
      user_id: user_id,
      image: image,
    });

    return { user: user };
  }
}
