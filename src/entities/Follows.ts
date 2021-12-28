import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('follows', { schema: 'neighborhood-chores' })
export class Follows {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('bigint', { name: 'user_id' })
  userId: string;

  @Column('bigint', { name: 'target_user_id' })
  targetUserId: string;

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
}
