import {
    Entity,
    BaseEntity,
    Column,
    ManyToOne,
    JoinColumn,
    PrimaryGeneratedColumn,
    OneToMany
} from 'typeorm';
import { Transaction } from './Transaction';

@Entity()
export class Refund extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(type => Transaction, (t: Transaction) => t.refunds)
    @JoinColumn()
    transaction!: Transaction;

    @Column({
        type: 'text'
    })
    description!: string;
}