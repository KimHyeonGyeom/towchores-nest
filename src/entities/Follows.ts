import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('follows ', { schema: 'neighborhood-chores' })
export class Follows {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('bigint', { name: 'user_id' })
  userId: string;

  @Column('bigint', { name: 'target_user_id' })
  targetUserId: string;

  @Column('datetime', { name: 'created_at' })
  createdAt: Date;

  @Column('datetime', { name: 'updated_at' })
  updatedAt: Date;

  @Column('datetime', { name: 'deleted_at', nullable: true })
  deletedAt: Date | null;
}
