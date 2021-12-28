import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Index('comments_parent_comment_id_IDX', ['parentCommentId'], {})
@Index('comments_post_id_IDX', ['postId'], {})
@Entity('comments', { schema: 'neighborhood-chores' })
export class Comments {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Column('bigint', { name: 'post_id' })
  postId: string;

  @Column('bigint', { name: 'user_id' })
  userId: string;

  @Column('bigint', { name: 'parent_comment_id', nullable: true })
  parentCommentId: string | null;

  @Column('text', { name: 'comment' })
  comment: string;

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
