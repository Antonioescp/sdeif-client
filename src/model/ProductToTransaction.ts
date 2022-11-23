import {
    Entity,
    BaseEntity,
    Column,
    ManyToOne,
    PrimaryGeneratedColumn
} from 'typeorm';

import { Product } from './Product';
import { Transaction } from './Transaction';
import { Min, IsPositive } from 'class-validator'

@Entity()
export class ProductToTransaction extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({
        type: 'integer',
        nullable: false
    })
    public productId: number;

    @Column({
        type: 'integer',
        nullable: false
    })
    public transactionId: number;

    @Column({
        type: 'integer',
        nullable: false
    })
    @Min(1, {
        message: "La cantidad no puede ser 0"
    })
    @IsPositive({
        message: "La cantidad no puede ser negativa"
    })
    public quantity: number;

    @Column({
        type: 'decimal',
        nullable: false
    })
    @IsPositive({
        message: "El precio no puede ser negativo"
    })
    public price: number;

    @ManyToOne(type => Product, (p: Product) => p.productToTransactions)
    product: Product;

    @ManyToOne(type => Transaction, (t: Transaction) => t.productToTransactions)
    transaction: Transaction;
}