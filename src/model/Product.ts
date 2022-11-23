import {
    Entity,
    BaseEntity,
    Column,
    ManyToOne,
    JoinColumn,
    PrimaryGeneratedColumn,
    OneToMany
} from 'typeorm';
import { DistributorToProduct } from './DistributorToProduct';
import { Laboratory } from './Laboratory';
import { Medication } from './Medication';
import { ProductToTransaction } from './ProductToTransaction';
import { Supply } from './Supply';
import { IsPositive, Min } from 'class-validator';

@Entity()
export class Product extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Laboratory, (l: Laboratory) => l.products, {
        cascade: true,
        nullable: false
    })
    @JoinColumn()
    laboratory: Laboratory;

    @Column({
        type: 'decimal',
        nullable: false
    })
    @IsPositive({
        message: "El precio debe ser un numero positivo"
    })
    currentPrice: number;

    @Column({
        type: 'integer',
        nullable: false
    })
    @IsPositive({
        message: "La cantidad de unidades debe ser un numero positivo"
    })
    units: number;

    @OneToMany(type => ProductToTransaction, (ptt: ProductToTransaction) => ptt.product, {
        cascade: true
    })
    productToTransactions: ProductToTransaction[];

    @OneToMany(type => DistributorToProduct, (dtp: DistributorToProduct) => dtp.product, {
        cascade: true
    })
    distributorToProducts: DistributorToProduct[];

    @OneToMany(type => Supply, (s: Supply) => s.product, {
        cascade: true
    })
    supplies: Supply[];

    @OneToMany(type => Medication, (m: Medication) => m.product, {
        cascade: true
    })
    medications: Medication[];
}