import {
    Entity,
    BaseEntity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    OneToMany
} from 'typeorm';
import { Person } from './Person';
import { Transaction } from './Transaction';

@Entity()
export class Customer extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Person, (p: Person) => p.customers, {
        nullable: false,
        cascade: true
    })
    @JoinColumn()
    person: Person;

    @OneToMany(type => Transaction, (t: Transaction) => t.customer)
    transactions: Transaction[];
}