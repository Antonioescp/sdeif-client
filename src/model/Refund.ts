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
import { MinLength } from 'class-validator';

@Entity()
export class Refund extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Transaction, (t: Transaction) => t.refunds, {
        nullable: false
    })
    @JoinColumn()
    transaction: Transaction;

    @Column({
        type: 'text',
        nullable: false
    })
    @MinLength(4, {
        message: "La descripcion es muy corta"
    })
    description: string;
}