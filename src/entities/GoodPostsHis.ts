import {
  Column,
  Entity,
  Index,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Posts } from './Posts';

@Index('good_posts_his_post_id_IDX', ['postId', 'userId'], {})
@Entity('good_posts_his', { schema: 'neighborhood-chores' })
export class GoodPostsHis {
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

  @ManyToMany(() => Posts, (posts) => posts.goodPostsHis)
  posts: Posts[];
}
