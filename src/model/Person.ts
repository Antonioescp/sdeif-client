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

@Entity()
export class Person extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    lastname: string;

    @Column()
    phoneNumber: string;

    @ManyToOne(type => Address, (address: Address) => address.people, {
        cascade: true
    })
    @JoinColumn()
    address: Address;

    @OneToMany(type => Employee, (employee: Employee) => employee.person, {
        cascade: true
    })
    employees: Employee[];

    @OneToMany(type => Customer, (c: Customer) => c.person, {
        cascade: true
    })
    customers: Customer[];
}