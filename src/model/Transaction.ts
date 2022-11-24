import {
    Entity,
    BaseEntity,
    ManyToOne,
    JoinColumn,
    PrimaryGeneratedColumn,
    OneToMany,
    Column
} from 'typeorm';
import { Customer } from './Customer';
import { ProductToTransaction } from './ProductToTransaction';
import { Purchase } from './Purchase';
import { Refund } from './Refund';

@Entity()
export class Transaction extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Customer, (c: Customer) => c.transactions, {
        nullable: false
    })
    @JoinColumn()
    customer: Customer;

    @Column({
        nullable: false,
        type: 'date'
    })
    date: Date

    @OneToMany(type => Purchase, (p: Purchase) => p.transaction)
    purchases: Purchase[];

    @OneToMany(type => Refund, (r: Refund) => r.transaction)
    refunds: Refund[];

    @OneToMany(type => ProductToTransaction, (ptt: ProductToTransaction) => ptt.transaction)
    productToTransactions: ProductToTransaction[]
}