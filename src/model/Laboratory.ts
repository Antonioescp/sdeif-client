import {
    Entity,
    BaseEntity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany
} from 'typeorm';
import { Product } from './Product';
import { IsNotEmpty } from 'class-validator';

@Entity()
export class Laboratory extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        nullable: false
    })
    @IsNotEmpty({
        message: "El nombre no puede estar vacio"
    })
    name: string;

    @OneToMany(type => Product, (p: Product) => p.laboratory)
    products: Product[];
}