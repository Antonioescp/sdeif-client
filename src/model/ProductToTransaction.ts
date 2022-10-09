import {
    Entity,
    BaseEntity,
    Column,
    ManyToOne,
    PrimaryGeneratedColumn
} from 'typeorm';

import { Product } from './Product';
import { Transaction } from './Transaction';

@Entity()
export class ProductToTransaction extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    public productId!: number;

    @Column()
    public transactionId!: number;

    @Column({
        type: 'integer'
    })
    public quantity!: number;

    @Column({
        type: 'decimal'
    })
    public price!: number;

    @ManyToOne(type => Product, (p: Product) => p.productToTransactions)
    product: Product;

    @ManyToOne(type => Transaction, (t: Transaction) => t.productToTransactions)
    transaction: Transaction;
}