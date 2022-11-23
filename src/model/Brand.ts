import { 
    Entity, 
    Column, 
    BaseEntity, 
    PrimaryGeneratedColumn,
    OneToMany
} from 'typeorm';
import { Medication } from './Medication';
import { IsNotEmpty } from 'class-validator';

@Entity()
export class Brand extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        nullable: false
    })
    @IsNotEmpty({
        message: "El nombre de la marca no puede estar vacio"
    })
    name: string;

    @OneToMany(type => Medication, (m: Medication) => m.brand, {
        cascade: true
    })
    medications: Medication[];
}