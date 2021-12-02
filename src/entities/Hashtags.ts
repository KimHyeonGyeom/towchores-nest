import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Posts } from './Posts';

@Index('hashtags_keyword_IDX', ['keyword'], { fulltext: true })
@Index('post_id', ['postId'], {})
@Entity('hashtags', { schema: 'neighborhood-chores' })
export class Hashtags {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Column('bigint', { primary: true, name: 'post_id' })
  postId: string;

  @Column('varchar', { primary: true, name: 'keyword', length: 100 })
  keyword: string;

  @Column('datetime', { name: 'created_at' })
  createdAt: Date;

  @Column('datetime', { name: 'updated_at' })
  updatedAt: Date;

  @Column('datetime', { name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @ManyToOne(() => Posts, (posts) => posts.hashtags, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'post_id', referencedColumnName: 'id' }])
  post: Posts;
}
