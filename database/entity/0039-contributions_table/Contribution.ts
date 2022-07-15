import Decimal from 'decimal.js-light'
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm'
import { DecimalTransformer } from '../../src/typeorm/DecimalTransformer'
import { User } from '../User'

@Entity('contributions')
export class Contribution extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { unsigned: true })
  id: number

  @Column({ unsigned: true, nullable: false, name: 'user_id' })
  userId: number

  @ManyToOne(() => User, (user) => user.contributions)
  @JoinColumn({ name: 'user_id' })
  user: User

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
  createdAt: Date

  @Column({ type: 'datetime', nullable: false, name: 'contribution_date' })
  contributionDate: Date

  @Column({ length: 255, nullable: false, collation: 'utf8mb4_unicode_ci' })
  memo: string

  @Column({
    type: 'decimal',
    precision: 40,
    scale: 20,
    nullable: false,
    transformer: DecimalTransformer,
  })
  amount: Decimal

  @Column({ unsigned: true, nullable: true, name: 'moderator_id' })
  moderatorId: number

  @Column({ unsigned: true, nullable: true, name: 'contribution_link_id' })
  contributionLinkId: number

  @Column({ unsigned: true, nullable: true, name: 'confirmed_by' })
  confirmedBy: number

  @Column({ nullable: true, name: 'confirmed_at' })
  confirmedAt: Date

  @Column({ unsigned: true, nullable: true, name: 'transaction_id' })
  transactionId: number

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date | null
}
