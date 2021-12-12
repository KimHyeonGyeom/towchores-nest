import { Users } from '../../entities/Users';
import { PickType } from '@nestjs/swagger';

export class LoginRequestDto extends PickType(Users, [
  'social_id',
  'device_token',
] as const) {}
