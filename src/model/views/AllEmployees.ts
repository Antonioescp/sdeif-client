import { ViewEntity, DataSource, ViewColumn } from "typeorm";
import { Employee, Person, EmployeePosition } from "../.";

@ViewEntity({
    expression: (dataSource: DataSource) => dataSource
        .createQueryBuilder()
        .select("person.name", "Nombre")
        .addSelect("employee.id", "Id")
        .addSelect("person.lastname", "Apellido")
        .addSelect("person.phoneNumber", "Telefono")
        .addSelect("employee_position.title", "Cargo")
        .addSelect("employee_position.salary", "Salario")
        .addSelect("employee.hiringDate", "Contratacion")
        .addSelect("employee.dismissalDate", "Despido")
        .from(Employee, "employee")
        .innerJoin(EmployeePosition, "employee_position", "employee.positionId = employee_position.id")
        .innerJoin(Person, "person", "employee.personId = person.id")
    })
export class AllEmployees {
    @ViewColumn()
    Id: number
    
    @ViewColumn()
    Nombre: string

    @ViewColumn()
    Apellido: string

    @ViewColumn()
    Telefono: string

    @ViewColumn()
    Cargo: string

    @ViewColumn()
    Salario: number

    @ViewColumn()
    Contratacion: Date

    @ViewColumn()
    Despido: Date
}