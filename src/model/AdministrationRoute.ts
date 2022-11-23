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
export class AdministrationRoute extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        nullable: false
    })
    @IsNotEmpty({
        message: "The name cannot be empty"
    })
    name: string;

    @OneToMany(type => Medication, (m: Medication) => m.administrationRoute, {
        cascade: true
    })
    medications: Medication[];

}