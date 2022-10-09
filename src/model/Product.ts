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

@Entity()
export class Product extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(type => Laboratory, (l: Laboratory) => l.products, {
        cascade: true
    })
    @JoinColumn()
    laboratory!: Laboratory;

    @Column({
        type: 'decimal'
    })
    currentPrice!: number;

    @Column({
        type: 'integer'
    })
    units!: number;

    @OneToMany(type => ProductToTransaction, (ptt: ProductToTransaction) => ptt.product, {
        cascade: true
    })
    productToTransactions!: ProductToTransaction[];

    @OneToMany(type => DistributorToProduct, (dtp: DistributorToProduct) => dtp.product, {
        cascade: true
    })
    distributorToProducts!: DistributorToProduct[];

    @OneToMany(type => Supply, (s: Supply) => s.product, {
        cascade: true
    })
    supplies!: Supply[];

    @OneToMany(type => Medication, (m: Medication) => m.product, {
        cascade: true
    })
    medications!: Medication[];
}