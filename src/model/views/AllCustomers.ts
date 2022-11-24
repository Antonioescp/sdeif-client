import { ViewEntity, DataSource, ViewColumn } from "typeorm";
import { Customer, Person } from "../.";

@ViewEntity({
    expression: (dataSource: DataSource) => dataSource
        .createQueryBuilder()
        .select("customer.id", "Id")
        .addSelect("person.name", "Nombre")
        .addSelect("person.lastname", "Apellido")
        .addSelect("person.phoneNumber", "Telefono")
        .from(Customer, "customer")
        .innerJoin(Person, "person", "customer.personId = person.id")
    })
export class AllCustomers {
    @ViewColumn()
    Id: number

    @ViewColumn()
    Nombre: string

    @ViewColumn()
    Apellido: string

    @ViewColumn()
    Telefono: string
}