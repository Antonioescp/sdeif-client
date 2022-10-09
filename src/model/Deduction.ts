import {
    Entity,
    BaseEntity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn
} from 'typeorm';
import { Employee } from './Employee';

@Entity()
export class Deduction extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(type => Employee, (e: Employee) => e.deductions)
    @JoinColumn()
    employee!: Employee;

    @Column({
        type: 'decimal'
    })
    amount!: number;

    @Column({
        type: 'date'
    })
    appliedAt!: Date;

    @Column({
        type: 'text'
    })
    description!: string;
}