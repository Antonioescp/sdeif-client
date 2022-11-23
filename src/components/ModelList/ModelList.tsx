import { FC, useEffect, useState } from "react";
import './ModelList.css';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Table from 'react-bootstrap/Table';
import ActionButton from '../ActionButton';

import appDataSource from '../../services/DataSource';
import { ObjectLiteral, EntityTarget, BaseEntity } from "typeorm";
import { useSelector } from 'react-redux';
import { RootState } from '../../store/index';
import { ConnectionStatus } from '../../store/Database';

interface ModelListProperties {
    modelName: string,
    model: EntityTarget<ObjectLiteral>,
    customColumns?: Record<string, string>,
    onEdit?: (item: BaseEntity) => void
}

const ModelList: FC<ModelListProperties> = ({
    modelName,
    model,
    customColumns,
    onEdit
}) => {

    const databaseConnection = useSelector((state: RootState) => state.database.connection);

    const [items, setItems] = useState<any[]>([]);
    const [headers, setHeaders] = useState<any[]>([]);

    useEffect(() => {
        if (databaseConnection === ConnectionStatus.Active) {
            (async () => {
                setItems(await getAllItems());
                setHeaders(getNewHeaders());
            })();
        }
    }, [databaseConnection]);

    const getAllItems = async (): Promise<ObjectLiteral[]> => {
        const repo = appDataSource.getRepository(model);
        const allItems = await repo.find();
        return allItems;
    }

    const getNewHeaders = (): string[] => {
        if (customColumns) {
            const newHeaders = Object.values(customColumns);
            newHeaders.push("Opciones");
            return newHeaders;
        } else {
            const tableColumns = appDataSource.getMetadata(model).columns;
            const newHeaders = tableColumns.map(col => {
                return col.databaseNameWithoutPrefixes
            });
            newHeaders.push("Opciones");
            return newHeaders;
        }
    };

    const getModelProperties = (): string[] => {
        if (customColumns) {
            return Object.keys(customColumns);
        } else {
            const tableColumns = appDataSource.getMetadata(model).columns;
            const newHeaders = tableColumns.map(col => {
                return col.databaseNameWithoutPrefixes
            });
            return newHeaders;
        }
    }

    const headersView = <tr>
        {headers.map(header => {
            return <th>{header}</th>;
        })}
    </tr>;

    const itemsView = items.map((item) => {

        const modelProperties = getModelProperties();
        const rowItems = modelProperties.map(prop => {
            return <td>
                {item[prop]}
            </td>;
        });

        const onDelete = async () => {
            await item.remove();
        };

        const onDeleted = async () => {
            setItems(await getAllItems());
        }

        return <tr>
            {rowItems}
            <td style={{ textAlign: 'center' }}>
                <ButtonGroup aria-label="Opciones">
                    <Button
                        variant="success"
                        onClick={() => onEdit ? onEdit(item) : null}
                    >
                        Editar
                    </Button>
                    <ActionButton
                        variant="danger"
                        action={onDelete}
                        onComplete={onDeleted}
                    >
                        Borrar
                    </ActionButton>
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