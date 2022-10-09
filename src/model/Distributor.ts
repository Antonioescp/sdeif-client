import { 
    Entity, 
    Column, 
    BaseEntity, 
    PrimaryGeneratedColumn, 
    ManyToOne,
    OneToMany
} from 'typeorm';
import { DistributorToProduct } from './DistributorToProduct';

@Entity()
export class Distributor extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @OneToMany(type => DistributorToProduct, (dtp: DistributorToProduct) => dtp.distributor)
    distributorToProducts: DistributorToProduct[];
}