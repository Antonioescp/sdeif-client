import { 
    Entity, 
    Column, 
    BaseEntity, 
    PrimaryGeneratedColumn,
    OneToMany
} from 'typeorm';
import { Supply } from './Supply';
import { IsNotEmpty } from 'class-validator';

@Entity()
export class SupplyCategory extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        nullable: false
    })
    @IsNotEmpty({
        message: "El nombre de la categoria de insumo no puede estar vacia"
    })
    name: string;

    @OneToMany(type => Supply, (s: Supply) => s.category)
    supplies: Supply[]
}