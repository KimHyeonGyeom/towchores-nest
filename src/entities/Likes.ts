import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Posts } from './Posts';

@Index('likes_post_id_IDX', ['postId', 'userId'], {})
@Entity('likes', { schema: 'neighborhood-chores' })
export class Likes {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('bigint', { name: 'user_id' })
  userId: string;

  @Column('bigint', { name: 'post_id' })
  postId: string;

  @Column('datetime', { name: 'created_at' })
  createdAt: Date;

  @Column('datetime', { name: 'updated_at' })
  updatedAt: Date;

  @Column('datetime', { name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @ManyToOne(() => Posts, (posts) => posts.likes, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'post_id', referencedColumnName: 'id' }])
  post: Posts;
}
