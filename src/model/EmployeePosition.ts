import {
    Entity,
    BaseEntity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany
} from 'typeorm';
import { Employee } from './Employee';

@Entity()
export class EmployeePosition extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column({
        type:'decimal'
    })
    salary!: number

    @OneToMany(type => Employee, (e: Employee) => e.position)
    employees: Employee[]
}