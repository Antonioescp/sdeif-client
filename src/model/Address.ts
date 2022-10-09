import { 
    Entity, 
    Column, 
    BaseEntity, 
    PrimaryGeneratedColumn,
    OneToMany
} from 'typeorm';
import { Person } from './Person';

@Entity()
export class Address extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    city: string;

    @Column()
    neighborhood: string;

    @Column()
    houseCode: string;

    @OneToMany(type => Person, (person: Person) => person.address)
    people: Person[]
}