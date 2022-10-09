import { 
    Entity, 
    Column, 
    BaseEntity, 
    PrimaryGeneratedColumn,
    OneToMany
} from 'typeorm';
import { Medication } from './Medication';

@Entity()
export class Brand extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @OneToMany(type => Medication, (m: Medication) => m.brand, {
        cascade: true
    })
    medications: Medication[];
}