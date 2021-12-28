import { Users } from '../../../entities/Users';
import { ApiProduces, PickType } from '@nestjs/swagger';

export class SignupRequestDto extends PickType(Users, [
  'nickname',
  'social_id',
  'social_type',
  'latitude',
  'longitude',
] as const) {}
