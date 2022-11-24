import {
    Entity,
    BaseEntity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany
} from 'typeorm';
import { Employee } from './Employee';
import { MinLength, MaxLength, IsString, IsNumber, IsPositive } from 'class-validator';

@Entity()
export class EmployeePosition extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        nullable: false
    })
    @MinLength(2, {
        message: "El titulo es muy corto"
    })
    @MaxLength(50, {
        message: "El titulo es muy largo"
    })
    @IsString({
        message: "El titulo no es una cadena valida"
    })
    title: string;

    @Column({
        type: 'decimal',
        nullable: false
    })
    @IsNumber({
        maxDecimalPlaces: 2
    })
    @IsPositive({
        message: "El salario debe ser un numero positivo"
    })
    salary: number

    @OneToMany(type => Employee, (e: Employee) => e.position)
    employees: Employee[]
}