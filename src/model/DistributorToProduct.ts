import {
    Entity,
    Column,
    BaseEntity,
    PrimaryGeneratedColumn,
    ManyToOne
} from 'typeorm';
import { Distributor } from './Distributor';
import { Product } from './Product';
import { Min, IsPositive } from 'class-validator';

@Entity()
export class DistributorToProduct extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({
        type: 'integer',
        nullable: false
    })
    public distributorId: number;

    @Column({
        type: 'integer',
        nullable: false
    })
    public productId: number;

    @ManyToOne(type => Distributor, (d: Distributor) => d.distributorToProducts, {
        nullable: false
    })
    public distributor: Distributor;

    @ManyToOne(type => Product, (p: Product) => p.distributorToProducts, {
        nullable: false
    })
    public product: Product;

    @Column({
        type: 'integer',
        nullable: false
    })
    @IsPositive({
        message: "La cantidad de productos debe ser un numero positivo"
    })
    public quantity: number;

    @Column({
        type: 'decimal',
        nullable: false
    })
    @Min(0, {
        message: "El precio del producto no puede ser menor a 0"
    })
    public price: number;

    @Column({
        type: 'date',
        nullable: false
    })
    public purchaseDate: Date;

    @Column({
        type: 'date',
        nullable: false
    })
    public expiringDate: Date;
}