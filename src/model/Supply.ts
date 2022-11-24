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
import { IsNotEmpty } from 'class-validator';

@Entity()
export class Supply extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Product, (p: Product) => p.supplies, {
        nullable: false, cascade: true
    })
    @JoinColumn()
    product: Product;

    @ManyToOne(type => SupplyCategory, (sc: SupplyCategory) => sc.supplies, {
        nullable: false
    })
    @JoinColumn()
    category: SupplyCategory;

    @Column({
        type: 'varchar',
        nullable: false
    })
    @IsNotEmpty({
        message: "El nombre del insumo no puede estar vacio"
    })
    name: string;
}