import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  IsBoolean,
  IsDecimal,
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Index('nickname', ['nickname'], { unique: true })
@Index('social_id', ['social_id'], { unique: true })
@Entity('users', { schema: 'neighborhood-chores' })
export class Users {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Column('varchar', { name: 'role', length: 20 })
  @ApiProperty({
    example: 'user',
    description: '권한',
  })
  role: string;

  @IsString()
  @IsNotEmpty({
    message: '닉네임을 입력해주세요.',
  })
  @Column('varchar', { name: 'nickname', unique: true, length: 20 })
  @ApiProperty({
    example: '닉네임',
    description: '닉네임',
    required: true,
  })
  nickname: string | null;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '',
    description: '소셜 아이디',
    required: true,
  })
  @Column('varchar', {
    name: 'social_id',
    nullable: true,
    unique: true,
    length: 200,
  })
  social_id: string | null;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '',
    description: '소셜 타입',
    required: true,
  })
  @Column('char', { name: 'social_type', nullable: true, length: 1 })
  social_type: string | null;

  @IsString()
  @ApiProperty({
    example: '010-1111-2222',
    description: '핸드폰 번호',
  })
  @Column('varchar', { name: 'mobile_number', nullable: true, length: 11 })
  mobile_number: string | null;

  @IsDecimal()
  @IsNotEmpty()
  @ApiProperty({
    example: '37.4980950000',
    description: '위도',
    required: true,
  })
  @Column('decimal', {
    name: 'latitude',
    nullable: true,
    precision: 18,
    scale: 10,
  })
  latitude: string | null;

  @IsDecimal()
  @IsNotEmpty()
  @ApiProperty({
    example: '127.0276100000',
    description: '경도',
    required: true,
  })
  @Column('decimal', {
    name: 'longitude',
    nullable: true,
    precision: 18,
    scale: 10,
  })
  longitude: string | null;

  @IsString()
  @ApiProperty({
    example: '',
    description: '프로필 이미지 경로',
    required: true,
  })
  @Column('varchar', { name: 'profile_image_url', nullable: true, length: 500 })
  profile_image_url: string | null;

  @ApiProperty({
    example: '',
    description: '생성날짜',
  })
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  @Column('datetime', { name: 'created_at' })
  created_at: Date;

  @ApiProperty({
    example: '',
    description: '수정날짜',
  })
  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  @Column('datetime', { name: 'updated_at' })
  updated_at: Date;

  @ApiProperty({
    example: '',
    description: '삭제날짜',
  })
  @DeleteDateColumn()
  @Column('datetime', { name: 'deleted_at', nullable: true })
  deleted_at: Date | null;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '',
    description: '디바이스 토큰',
    required: true,
  })
  @Column('varchar', { name: 'device_token', nullable: true, length: 1000 })
  device_token: string | null;

  @IsString()
  @IsEmail()
  @Column('varchar', { name: 'email', nullable: true, length: 255 })
  email: string | null;

  @IsString()
  @Column('varchar', {
    name: 'password',
    nullable: true,
    length: 255,
  })
  password: string | null;

  @IsBoolean()
  @Column('tinyint', { name: 'user_type', nullable: true })
  user_type: number | null;
}
