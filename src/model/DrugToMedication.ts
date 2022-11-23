import {
    Entity,
    BaseEntity,
    Column,
    ManyToOne,
    PrimaryGeneratedColumn
} from 'typeorm';
import { Drug } from './Drug';
import { Medication } from './Medication';
import { IsPositive } from 'class-validator';

@Entity()
export class DrugToMedication extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'integer',
        nullable: false
    })
    drugId: number;

    @Column({
        type: 'integer',
        nullable: false
    })
    medicationId: number;

    @ManyToOne(type => Drug, (d: Drug) => d.drugToMedications)
    drug: Drug;

    @ManyToOne(type => Medication, (m: Medication) => m.drugToMedications)
    medication: Medication;

    @Column({
        type: 'decimal',
        nullable: false
    })
    @IsPositive({
        message: "La cantidad del farmaco debe ser un numero positivo"
    })
    quantity: number
    
}