import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('pushes', { schema: 'neighborhood-chores' })
export class Pushes {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('bigint', { name: 'user_id', comment: '유저 아이디' })
  userId: string;

  @Column('bigint', {
    name: 'comment_id',
    nullable: true,
    comment: '댓글 아이디',
  })
  commentId: string | null;

  @Column('bigint', {
    name: 'post_id',
    nullable: true,
    comment: '게시글 아이디',
  })
  postId: string | null;

  @Column('bigint', { name: 'reference_id', comment: '관계 유저 아이디' })
  referenceId: string;

  @Column('varchar', { name: 'title', comment: '제목', length: 255 })
  title: string;

  @Column('varchar', {
    name: 'content',
    nullable: true,
    comment: '내용',
    length: 255,
  })
  content: string | null;

  @Column('tinyint', {
    name: 'msg_division',
    comment: '메시지 구분 (1 : 댓글)',
    width: 1,
  })
  msgDivision: boolean;

  @Column('tinyint', {
    name: 'is_read',
    comment: '푸시알림 읽기 여부',
    width: 1,
    default: () => "'0'",
  })
  isRead: boolean;

  @Column('datetime', { name: 'created_at' })
  createdAt: Date;

  @Column('datetime', { name: 'updated_at' })
  updatedAt: Date;

  @Column('datetime', { name: 'deleted_at', nullable: true })
  deletedAt: Date | null;
}
