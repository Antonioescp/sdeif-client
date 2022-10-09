import {
    Entity,
    BaseEntity,
    ManyToOne, 
    JoinColumn,
    Column,
    PrimaryGeneratedColumn,
    OneToMany
} from 'typeorm';
import { Deduction } from './Deduction';
import { EmployeePosition } from './EmployeePosition';
import { Person } from './Person';

@Entity()
export class Employee extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(type => Person, (p: Person) => p.employees)
    @JoinColumn()
    person!: Person;

    @ManyToOne(type => EmployeePosition, (ep: EmployeePosition) => ep.employees)
    @JoinColumn()
    position!: EmployeePosition;

    @Column({
        type: "date"
    })
    hiringDate!: Date;

    @Column({
        type: "date"
    })
    dismissalDate: Date;

    @OneToMany(type => Deduction, (d: Deduction) => d.employee)
    deductions: Deduction[];
}