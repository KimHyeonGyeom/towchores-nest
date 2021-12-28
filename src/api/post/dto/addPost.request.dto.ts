import { Posts } from '../../../entities/Posts';
import { PickType } from '@nestjs/swagger';

export class addPostRequestDto extends PickType(Posts, [
  'title',
  'content',
  'latitude',
  'longitude',
  'area',
] as const) {}
