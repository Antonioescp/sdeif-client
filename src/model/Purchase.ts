import {
    Entity,
    BaseEntity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn
} from 'typeorm';
import { Transaction } from './Transaction';

@Entity()
export class Purchase extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Transaction, (t: Transaction) => t.purchases, {
        nullable: false
    })
    @JoinColumn()
    transaction: Transaction;
}