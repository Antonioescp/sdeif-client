import { 
    Entity, 
    Column, 
    BaseEntity, 
    PrimaryGeneratedColumn, 
    ManyToOne,
    OneToMany
} from 'typeorm';
import { Medication } from './Medication';
import { IsNotEmpty } from 'class-validator';

@Entity()
export class DrugForm extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        nullable: false
    })
    @IsNotEmpty({
        message: "El nombre de la presentacion no puede estar vacio"
    })
    name: string;

    @OneToMany(type => Medication, (m: Medication) => m.drugForm, {
        cascade: true
    })
    medications: Medication[];
}