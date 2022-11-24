import { ViewEntity, DataSource, ViewColumn } from "typeorm";
import { 
    Transaction,
    Customer,
    Person,
    ProductToTransaction
} from "..";

@ViewEntity({
    expression: (datasource: DataSource) => datasource
    .createQueryBuilder()
    .select("tx.id", "Id")
    .addSelect("CONCAT_WS(', ', p.lastname, p.name)", "Cliente")
    .addSelect("tx.date", "Fecha")
    .addSelect("ptt.quantity * ptt.price", "Total")
    .from(Transaction, "tx")
    .innerJoin(Customer, "cx", "tx.customerId = cx.id")
    .innerJoin(Person, 'p', 'cx.personId = p.id')
    .innerJoin(ProductToTransaction, 'ptt', 'ptt.transactionId = tx.id')
})
export class AllTransactions {
    @ViewColumn()
    Id: number

    @ViewColumn()
    Cliente: string

    @ViewColumn()
    Fecha: Date

    @ViewColumn()
    Total: number
}