import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as models from '../model';

const appDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "farma",
    password: "1234",
    database: "Farma",
    synchronize: true,
    logging: false,
    entities: Object.values(models),
    subscribers: [],
    migrations: [],
});

export default appDataSource;