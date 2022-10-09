import { 
    Entity, 
    Column, 
    BaseEntity, 
    PrimaryGeneratedColumn,
    OneToMany
} from 'typeorm';
import { DrugToMedication } from './DrugToMedication';

@Entity()
export class Drug extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @OneToMany(type => DrugToMedication, (dtm: DrugToMedication) => dtm.drug, {
        cascade: true
    })
    drugToMedications: DrugToMedication[];

}