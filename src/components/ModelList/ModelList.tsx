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
import { v4 as uuidv4 } from 'uuid';
import { useLocation } from 'react-router-dom';

interface ModelListProperties {
    modelName: string,
    model: EntityTarget<ObjectLiteral>,
    customColumns?: Record<string, string>,
    onEdit?: (item: BaseEntity) => Promise<void>,
    onDelete?: (item: any) => Promise<void>,
    onDeleted?: (item: any) => Promise<void>,
    onCreate?: () => void
}

const ModelList: FC<ModelListProperties> = ({
    modelName,
    model,
    customColumns,
    onEdit,
    onDelete,
    onDeleted,
    onCreate
}) => {

    const databaseConnection = useSelector((state: RootState) => state.database.connection);

    const [items, setItems] = useState<any[]>([]);
    const [headers, setHeaders] = useState<any[]>([]);

    useEffect(() => {
        if (databaseConnection === ConnectionStatus.Active) {
            updateList();
        }
    }, [databaseConnection]);

    useEffect(() => {
        updateList();
    }, [model, modelName])

    const updateList = async () => {
        setItems(await getAllItems());
        setHeaders(getNewHeaders());
    }

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

    const headersView = <tr key={uuidv4()}>
        {headers.map(header => {
            return <th key={uuidv4()}>{header}</th>;
        })}
    </tr>;

    const itemsView = items.map((item) => {

        const modelProperties = getModelProperties();
        const rowItems = modelProperties.map(prop => {
            const itemProp = item[prop];
            let value: string;
            if (itemProp !== undefined && itemProp !== null) {
                if (itemProp instanceof Date) {
                    value = itemProp.toLocaleDateString();
                } else if (!isNaN(itemProp)) {
                    const number = Number(itemProp);
                    if (number % 1 === 0) {
                        value = number.toString();
                    }
                    else {
                        value = number.toFixed(2).toString();
                    }
                } else {
                    value = itemProp.toString();
                }
            }
            else {
                value = "Sin definir";
            }

            return <td key={uuidv4()}>
                {value}
            </td>;
        });

        const onDeletionCompleted = async () => {
            await onDeleted?.call(this, item);
            setItems(await getAllItems());
        }

        return <tr key={uuidv4()}>
            {rowItems}
            <td style={{ textAlign: 'center' }}>
                <ButtonGroup aria-label="Opciones">
                    <Button
                        variant="success"
                        onClick={async () => onEdit ? await onEdit(item) : null}
                    >
                        Editar
                    </Button>
                    <ActionButton
                        variant="danger"
                        action={async () => onDelete ? await onDelete(item) : null}
                        onComplete={onDeletionCompleted}
                    >
                        Borrar
                    </ActionButton>
                </ButtonGroup>
            </td>
        </tr>;
    });

    return <Stack className="model-list">
        <Stack className="panel" direction='horizontal' gap={2}>
            <Button as="a" variant="primary" className="ms-auto" onClick={onCreate}>
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