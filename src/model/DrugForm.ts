import { 
    Entity, 
    Column, 
    BaseEntity, 
    PrimaryGeneratedColumn, 
    ManyToOne,
    OneToMany
} from 'typeorm';
import { Medication } from './Medication';

@Entity()
export class DrugForm extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @OneToMany(type => Medication, (m: Medication) => m.drugForm, {
        cascade: true
    })
    medications: Medication[];
}