import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Posts } from './Posts';
import { ApiProperty } from '@nestjs/swagger';

@Index('post_id', ['postId'], {})
@Entity('images', { schema: 'neighborhood-chores' })
export class Images {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Column('bigint', { name: 'post_id' })
  postId: string;

  @Column('bigint', { name: 'user_id' })
  userId: string;

  @Column('varchar', { name: 'image_name_url', length: 200 })
  imageNameUrl: string;

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

  @ManyToOne(() => Posts, (posts) => posts.images, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'post_id', referencedColumnName: 'id' }])
  post: Posts;
}
