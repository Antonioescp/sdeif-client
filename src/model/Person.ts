import { 
    Entity, 
    BaseEntity, 
    Column, 
    PrimaryGeneratedColumn, 
    ManyToOne, 
    JoinColumn, 
    OneToMany
} from "typeorm";
import { Address } from "./Address";
import { Customer } from "./Customer";
import { Employee } from "./Employee";
import { MinLength } from 'class-validator';

@Entity()
export class Person extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        nullable: false
    })
    @MinLength(1, {
        message: "El nombre no puede estar vacio"
    })
    name: string;

    @Column({
        type: 'varchar',
        nullable: false
    })
    @MinLength(1, {
        message: "El apellido no puede estar vacio"
    })
    lastname: string;

    @Column({
        type: 'varchar',
        nullable: true
    })
    @MinLength(8, {
        message: "El numero de telefono no puede estar vacio"
    })
    phoneNumber: string | null;

    @ManyToOne(type => Address, (address: Address) => address.people, {
        cascade: true,
        nullable: true
    })
    @JoinColumn()
    address: Address | null;

    @OneToMany(type => Employee, (employee: Employee) => employee.person)
    employees: Employee[];

    @OneToMany(type => Customer, (c: Customer) => c.person, {
        cascade: true
    })
    customers: Customer[];
}