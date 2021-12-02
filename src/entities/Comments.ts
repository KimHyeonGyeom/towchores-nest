import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column('datetime', { name: 'created_at' })
  createdAt: Date;

  @Column('datetime', { name: 'updated_at' })
  updatedAt: Date;

  @Column('datetime', { name: 'deleted_at', nullable: true })
  deletedAt: Date | null;
}
