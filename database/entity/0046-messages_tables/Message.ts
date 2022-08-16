import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Contribution } from '../Contribution'
import { User } from '../User'

@Entity('messages', { engine: 'InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci' })
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { unsigned: true })
  id: number

  @Column({ name: 'contribution_id', unsigned: true, nullable: false })
  contributionId: number

  @ManyToOne(() => Contribution, (contribution) => contribution.messages)
  @JoinColumn({ name: 'contribution_id' })
  contribution: Contribution

  @Column({ name: 'user_id', unsigned: true, nullable: false })
  userId: number

  @ManyToOne(() => User, (user) => user.messages)
  @JoinColumn({ name: 'user_id' })
  user: User

  @Column({ length: 2000, nullable: false, collation: 'utf8mb4_unicode_ci' })
  message: string

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
  createdAt: Date
}
