import { 
    Entity, 
    Column, 
    BaseEntity, 
    PrimaryGeneratedColumn, 
    ManyToOne
} from 'typeorm';
import { Distributor } from './Distributor';
import { Product } from './Product';

@Entity()
export class DistributorToProduct extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    public distributorId!: number;

    @Column()
    public productId!: number;

    @ManyToOne(type => Distributor, (d: Distributor) => d.distributorToProducts)
    public distributor!: Distributor;

    @ManyToOne(type => Product, (p: Product) => p.distributorToProducts)
    public product!: Product;

    @Column({
        type: 'decimal'
    })
    public price!: number;

    @Column({
        type: 'date'
    })
    public purchaseDate!: Date;

    @Column({
        type: 'date'
    })
    public expiringDate!: Date;
}