import { 
    Entity, 
    Column, 
    BaseEntity, 
    PrimaryGeneratedColumn, 
    ManyToOne,
    JoinColumn,
    OneToMany
} from 'typeorm';
import { AdministrationRoute } from './AdministrationRoute';
import { Brand } from './Brand';
import { DrugForm } from './DrugForm';
import { DrugToMedication } from './DrugToMedication';
import { Product } from './Product';

@Entity()
export class Medication extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    public requiresPrescription!: boolean;

    @ManyToOne(type => Product, (p: Product) => p.medications)
    @JoinColumn()
    product!: Product;

    @ManyToOne(type => AdministrationRoute, (ar: AdministrationRoute) => ar.medications)
    @JoinColumn()
    administrationRoute!: AdministrationRoute;

    @ManyToOne(type => DrugForm, (df: DrugForm) => df.medications)
    @JoinColumn()
    drugForm!: DrugForm;

    @ManyToOne(type => Brand, (b: Brand) => b.medications)
    @JoinColumn()
    brand!: Brand;

    @OneToMany(type => DrugToMedication, (dtm: DrugToMedication) => dtm.medication)
    drugToMedications!: DrugToMedication[];
}