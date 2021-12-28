import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Hashtags } from './Hashtags';
import { GoodPostsHis } from './GoodPostsHis';
import { Images } from './Images';
import { Likes } from './Likes';
import { ApiProperty } from '@nestjs/swagger';

@Index(
  'posts_user_id_IDX',
  ['userId', 'latitude', 'longitude', 'area', 'createdAt'],
  {},
)
@Index('text_idx', ['title', 'content'], { fulltext: true })
@Entity('posts', { schema: 'neighborhood-chores' })
export class Posts {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @ApiProperty({
    example: '1',
    description: '유저 아이디',
  })
  @Column('bigint', { name: 'user_id' })
  userId: string;

  @ApiProperty({
    example: '게시글 제목',
    description: '제목',
    minLength: 5,
    required: true,
  })
  @Column('varchar', { name: 'title', length: 50 })
  title: string;

  @ApiProperty({
    example: '게시글 내용',
    description: '내용',
    minLength: 10,
    required: true,
  })
  @Column('text', { name: 'content' })
  content: string;

  @ApiProperty({
    example: '10.000000',
    description: '위도',
    minimum: 1,
    required: true,
  })
  @Column('decimal', { name: 'latitude', precision: 18, scale: 10 })
  latitude: string;

  @ApiProperty({
    example: '100.000000',
    description: '경도',
    minimum: 1,
    required: true,
  })
  @Column('decimal', { name: 'longitude', precision: 18, scale: 10 })
  longitude: string;

  @ApiProperty({
    example: '신대방동',
    description: '지역',
    minLength: 1,
    required: true,
  })
  @Column('varchar', { name: 'area', length: 10 })
  area: string;

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

  @ApiProperty({
    example: '해시태그',
    description: '해시태그',
  })
  @OneToMany(() => Hashtags, (hashtags) => hashtags.post)
  hashtags: Hashtags[];

  @ManyToMany(() => GoodPostsHis, (goodPostsHis) => goodPostsHis.posts)
  @JoinTable({
    name: 'id',
    joinColumns: [{ name: 'post_id', referencedColumnName: 'id' }],
    inverseJoinColumns: [
      { name: 'good_posts_hi_id', referencedColumnName: 'id' },
    ],
    schema: 'neighborhood-chores',
  })
  goodPostsHis: GoodPostsHis[];

  @OneToMany(() => Images, (images) => images.post)
  images: Images[];

  @OneToMany(() => Likes, (likes) => likes.post)
  likes: Likes[];
}
