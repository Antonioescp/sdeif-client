import {
    Entity,
    BaseEntity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn
} from 'typeorm';
import { Employee } from './Employee';
import { IsPositive } from 'class-validator';

@Entity()
export class Deduction extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Employee, (e: Employee) => e.deductions, {
        nullable: false
    })
    @JoinColumn()
    employee: Employee;

    @Column({
        type: 'decimal',
        nullable: false
    })
    @IsPositive({
        message: "El monto a deducir debe ser un numero positivo"
    })
    amount: number;

    @Column({
        type: 'date',
        nullable: false
    })
    appliedAt: Date;

    @Column({
        type: 'text',
        nullable: false
    })
    description: string;
}