import { 
    Entity, 
    Column, 
    BaseEntity, 
    PrimaryGeneratedColumn, 
    ManyToOne,
    JoinColumn
} from 'typeorm';
import { Product } from './Product';
import { SupplyCategory } from './SupplyCategory';

@Entity()
export class Supply extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(type => Product, (p: Product) => p.supplies)
    @JoinColumn()
    product!: Product;

    @ManyToOne(type => SupplyCategory, (sc: SupplyCategory) => sc.supplies)
    @JoinColumn()
    category!: SupplyCategory;

    @Column()
    name!: string;
}