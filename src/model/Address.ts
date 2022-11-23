import { 
    Entity, 
    Column, 
    BaseEntity, 
    PrimaryGeneratedColumn,
    OneToMany
} from 'typeorm';
import { Person } from './Person';
import { MinLength } from 'class-validator';

@Entity()
export class Address extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        nullable: true
    })
    @MinLength(1, {
        message: "La ciudad no puede estar vacia"
    })
    city: string | null;

    @Column({
        type: 'varchar',
        nullable: true
    })
    @MinLength(1, {
        message: "El barrio no puede estar vacio"
    })
    neighborhood: string | null;

    @Column({
        type: 'varchar',
        nullable: true
    })
    @MinLength(1, {
        message: "La calle no puede estar vacia"
    })
    street: string | null

    @Column({
        type: 'varchar',
        nullable: true
    })
    @MinLength(1, {
        message: "El barrio no puede estar vacio"
    })
    houseCode: string | null;

    @OneToMany(type => Person, (person: Person) => person.address, {
        nullable: false
    })
    people: Person[]
}