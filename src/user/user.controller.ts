import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Query,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UndefinedToNullInterceptor } from '../interceptors/undefinedToNull.interceptor';
import { SignupRequestDto } from './dto/signup.request.dto';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiProduces,
  ApiTags,
} from '@nestjs/swagger';
import { ApiImplicitBody } from '@nestjs/swagger/dist/decorators/api-implicit-body.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { I18n, I18nContext } from 'nestjs-i18n';
import { LoginRequestDto } from './dto/login.request.dto';

@UseInterceptors(UndefinedToNullInterceptor)
@Controller('api/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/nhc-login')
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
}
