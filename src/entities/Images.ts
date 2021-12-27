import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Posts } from './Posts';

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

  @Column('datetime', { name: 'created_at' })
  createdAt: Date;

  @Column('datetime', { name: 'updated_at' })
  updatedAt: Date;

  @Column('datetime', { name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @ManyToOne(() => Posts, (posts) => posts.images, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'post_id', referencedColumnName: 'id' }])
  post: Posts;
}
