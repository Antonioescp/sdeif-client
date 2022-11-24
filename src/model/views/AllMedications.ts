import { ViewEntity, DataSource, ViewColumn } from "typeorm";
import { 
    Medication,
    Drug,
    DrugToMedication,
    DrugForm,
    Brand,
    Product,
    AdministrationRoute,
    Laboratory
} from "..";

@ViewEntity({
    expression: (datasource: DataSource) => datasource
    .createQueryBuilder()
    .select("product.id", "Id")
    .addSelect("brand.name", "Marca")
    .addSelect("drug_form.name", "Presentacion")
    .addSelect("administration_route.name", "Administracion")
    .addSelect("laboratory.name", "Laboratorio")
    .addSelect("product.currentPrice", "Precio")
    .addSelect("product.units", "Unidades")
    .addSelect("product.currentPrice / product.units", "PrecioUnitario")
    .from(Product, "product")
    .innerJoin(Medication, "medication", "medication.productId = product.id")
    .innerJoin(Laboratory, "laboratory", "product.laboratoryId = laboratory.id")
    .innerJoin(Brand, "brand", "medication.brandId = brand.id")
    .innerJoin(DrugForm, "drug_form", "medication.drugFormId = drug_form.id")
    .innerJoin(AdministrationRoute, "administration_route", "medication.administrationRoute.id = administration_route.id")
})
export class AllMedications {
    @ViewColumn()
    Id: number

    @ViewColumn()
    Marca: string

    @ViewColumn()
    Presentacion: string

    @ViewColumn()
    Administracion: string

    @ViewColumn()
    Laboratorio: string

    @ViewColumn()
    Precio: number

    @ViewColumn()
    Unidades: number

    @ViewColumn()
    PrecioUnitario: number
}