import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('blames', { schema: 'neighborhood-chores' })
export class Blames {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Column('bigint', { name: 'user_id', comment: '신고를 한 유저 아이디' })
  userId: string;

  @Column('tinyint', {
    name: 'target_type',
    nullable: true,
    comment: '1 : 게시물, 2 : 댓글, 3: 유저',
    width: 1,
  })
  targetType: boolean | null;

  @Column('bigint', {
    name: 'target_id',
    comment: '신고한 게시물, 댓글, 유저 아이디',
  })
  targetId: string;

  @Column('bigint', {
    name: 'target_user_id',
    nullable: true,
    comment: '신고를 당한 회원 아이디',
  })
  targetUserId: string | null;

  @ApiProperty({
    example: '',
    description: '생성날짜',
  })
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  @Column('datetime', { name: 'created_at' })
  createdAt: Date;

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
  updatedAt: Date;

  @ApiProperty({
    example: '',
    description: '삭제날짜',
  })
  @DeleteDateColumn()
  @Column('datetime', { name: 'deleted_at', nullable: true })
  deletedAt: Date | null;
}
