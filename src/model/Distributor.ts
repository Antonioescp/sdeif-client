import { 
    Entity, 
    Column, 
    BaseEntity, 
    PrimaryGeneratedColumn, 
    ManyToOne,
    OneToMany
} from 'typeorm';
import { DistributorToProduct } from './DistributorToProduct';
import { IsNotEmpty } from 'class-validator';

@Entity()
export class Distributor extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        nullable: false
    })
    @IsNotEmpty({
        message: "El nombre del distribuidor no puede estar vacio"
    })
    name: string;

    @OneToMany(type => DistributorToProduct, (dtp: DistributorToProduct) => dtp.distributor)
    distributorToProducts: DistributorToProduct[];
}