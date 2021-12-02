import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Hashtags } from './Hashtags';
import { GoodPostsHis } from './GoodPostsHis';
import { Images } from './Images';
import { Likes } from './Likes';

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

  @Column('bigint', { name: 'user_id' })
  userId: string;

  @Column('varchar', { name: 'title', length: 50 })
  title: string;

  @Column('text', { name: 'content' })
  content: string;

  @Column('decimal', { name: 'latitude', precision: 18, scale: 10 })
  latitude: string;

  @Column('decimal', { name: 'longitude', precision: 18, scale: 10 })
  longitude: string;

  @Column('varchar', { name: 'area', length: 10 })
  area: string;

  @Column('datetime', { name: 'created_at' })
  createdAt: Date;

  @Column('datetime', { name: 'updated_at' })
  updatedAt: Date;

  @Column('datetime', { name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

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
