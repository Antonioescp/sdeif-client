import { 
    Entity, 
    Column, 
    BaseEntity, 
    PrimaryGeneratedColumn,
    OneToMany
} from 'typeorm';
import { Medication } from './Medication';

@Entity()
export class AdministrationRoute extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @OneToMany(type => Medication, (m: Medication) => m.administrationRoute, {
        cascade: true
    })
    medications: Medication[];

}