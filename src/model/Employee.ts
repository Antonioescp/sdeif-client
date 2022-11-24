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
import { IsDate } from 'class-validator';

@Entity()
export class Employee extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Person, (p: Person) => p.employees, {
        nullable: false,
        cascade: true
    })
    @JoinColumn()
    person: Person;

    @ManyToOne(type => EmployeePosition, (ep: EmployeePosition) => ep.employees, {
        nullable: false
    })
    @JoinColumn()
    position: EmployeePosition;

    @Column({
        type: "date",
        nullable: false
    })
    @IsDate()
    hiringDate: Date;

    @Column({
        type: "date",
        nullable: true
    })
    @IsDate()
    dismissalDate: Date | null;

    @OneToMany(type => Deduction, (d: Deduction) => d.employee)
    deductions: Deduction[];
}