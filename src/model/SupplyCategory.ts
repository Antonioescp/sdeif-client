import { 
    Entity, 
    Column, 
    BaseEntity, 
    PrimaryGeneratedColumn, 
    ManyToOne,
    OneToMany
} from 'typeorm';
import { Supply } from './Supply';

@Entity()
export class SupplyCategory extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @OneToMany(type => Supply, (s: Supply) => s.category)
    supplies: Supply[]
}