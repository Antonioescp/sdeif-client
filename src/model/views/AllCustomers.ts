import { ViewEntity, DataSource, ViewColumn } from "typeorm";
import { Customer, Person, Address } from "../.";

@ViewEntity({
    expression: (dataSource: DataSource) => dataSource
        .createQueryBuilder()
        .select("customer.id", "Id")
        .addSelect("person.name", "Nombre")
        .addSelect("person.lastname", "Apellido")
        .addSelect("person.phoneNumber", "Telefono")
        .addSelect(
            `CONCAT_WS(', ', address.city, address.neighborhood, address.street, address.houseCode)`,
            "Direccion"
        )
        .from(Customer, "customer")
        .innerJoin(Person, "person", "customer.personId = person.id")
        .leftJoin(Address, "address", "person.addressId = address.id")
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

    @ViewColumn()
    Direccion: string
}