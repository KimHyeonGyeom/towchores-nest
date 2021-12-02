import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';

@Index('nickname', ['nickname'], { unique: true })
@Index('social_id', ['socialId'], { unique: true })
@Entity('users', { schema: 'neighborhood-chores' })
export class Users {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Column('varchar', { name: 'role', length: 20 })
  role: string;

  @IsString()
  @IsNotEmpty()
  @Column('varchar', { name: 'nickname', unique: true, length: 20 })
  nickname: string;

  @Column('varchar', {
    name: 'social_id',
    nullable: true,
    unique: true,
    length: 200,
  })
  socialId: string | null;

  @Column('char', { name: 'social_type', nullable: true, length: 1 })
  socialType: string | null;

  @Column('varchar', { name: 'mobile_number', nullable: true, length: 11 })
  mobileNumber: string | null;

  @Column('decimal', {
    name: 'latitude',
    nullable: true,
    precision: 18,
    scale: 10,
  })
  latitude: string | null;

  @Column('decimal', {
    name: 'longitude',
    nullable: true,
    precision: 18,
    scale: 10,
  })
  longitude: string | null;

  @Column('varchar', { name: 'profile_image_url', nullable: true, length: 500 })
  profileImageUrl: string | null;

  @Column('datetime', { name: 'created_at' })
  createdAt: Date;

  @Column('datetime', { name: 'updated_at' })
  updatedAt: Date;

  @Column('datetime', { name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @Column('varchar', { name: 'device_token', nullable: true, length: 1000 })
  deviceToken: string | null;

  @Column('varchar', { name: 'email', nullable: true, length: 255 })
  email: string | null;

  @Column('varchar', { name: 'password', nullable: true, length: 255 })
  password: string | null;

  @Column('tinyint', { name: 'user_type', nullable: true })
  userType: number | null;
}
