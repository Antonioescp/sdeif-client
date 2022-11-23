import { FC, useEffect, useState } from "react";
import './ModelList.css';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Table from 'react-bootstrap/Table';

import appDataSource from '../../services/DataSource';
import { ObjectLiteral, EntityTarget } from "typeorm";
import { useSelector } from 'react-redux';
import { RootState } from '../../store/index';
import { ConnectionStatus } from '../../store/Database';

interface ModelListProperties {
    modelName: string,
    model: EntityTarget<ObjectLiteral>,
    ignoreProperties: string[],
    ignoreIds: boolean
}

const ModelList: FC<ModelListProperties> = ({ modelName, model, ignoreProperties, ignoreIds }) => {

    const databaseConnection = useSelector((state: RootState) => state.database.connection);

    const [items, setItems] = useState<any[]>([]);
    const [headers, setHeaders] = useState<any[]>([]);

    useEffect(() => {
        if (databaseConnection === ConnectionStatus.Active) {
            (async () => {
                const repo = appDataSource.getRepository(model);
                const allItems = await repo.find();
                setItems(allItems);

                const tableColumns = appDataSource.getMetadata(model).columns;
                const newHeaders = tableColumns.map(col => {
                    return col.databaseNameWithoutPrefixes
                });
                setHeaders(newHeaders);
            })();
        }
    }, [databaseConnection]);

    const filteredHeaders = headers.filter(header => {
        let ignore = false;

        ignore ||= ignoreProperties.includes(header);
        ignore ||= (ignoreIds && header.toLowerCase().includes('id'));

        return !ignore;
    })

    const headersView = <tr>
        {filteredHeaders.map(header => {
            return <th>{header}</th>;
        })}
        <th>Opciones</th>
    </tr>;

    const itemsView = items.map(item => {
        const properties = Object.getOwnPropertyNames(item);
        const filteredProperties = properties.filter(prop => {
            let ignore = ignoreProperties.includes(prop)
            ignore ||= ignoreIds && prop.toLowerCase().includes("id");
            return !ignore;
        });

        console.log(filteredProperties);

        const rowItems = filteredProperties.map(prop => {
            return <td>
                {item[prop]}
            </td>
        })

        return <tr>
            {rowItems}
            <td style={{
                textAlign: 'center'
            }}>
                <ButtonGroup aria-label="Opciones">
                    <Button variant="success">Editar</Button>
                    <Button variant="danger">Borrar</Button>
                </ButtonGroup>
            </td>
        </tr>;
    });

    return <Stack className="model-list">
        <Stack className="panel" direction='horizontal' gap={2}>
            <Button as="a" variant="primary" className="ms-auto">
                Crear {modelName}
            </Button>
        </Stack>
        <Table striped bordered hover responsive>
            <thead>
                {headersView}
            </thead>
            <tbody>
                {itemsView}
            </tbody>
        </Table>
    </Stack>;
}

export default ModelList;