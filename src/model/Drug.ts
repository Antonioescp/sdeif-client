import { 
    Entity, 
    Column, 
    BaseEntity, 
    PrimaryGeneratedColumn,
    OneToMany
} from 'typeorm';
import { DrugToMedication } from './DrugToMedication';
import { IsNotEmpty } from 'class-validator';

@Entity()
export class Drug extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        nullable: false
    })
    @IsNotEmpty({
        message: "El nombre del farmaco no puede estar vacio"
    })
    name: string;

    @OneToMany(type => DrugToMedication, (dtm: DrugToMedication) => dtm.drug, {
        cascade: true
    })
    drugToMedications: DrugToMedication[];

}