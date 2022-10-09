import {
    Entity,
    BaseEntity,
    Column,
    ManyToOne,
    PrimaryGeneratedColumn
} from 'typeorm';
import { Drug } from './Drug';
import { Medication } from './Medication';

@Entity()
export class DrugToMedication extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    drugId!: number;

    @Column()
    medicationId!: number;

    @ManyToOne(type => Drug, (d: Drug) => d.drugToMedications)
    drug: Drug;

    @ManyToOne(type => Medication, (m: Medication) => m.drugToMedications)
    medication: Medication;
    
}