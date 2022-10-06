import React, { FC } from 'react';
import './ModelList.css';

interface ModelListProps {
    modelName: { singular: string, plural: string };
    items: any[];
}

const ModelList: FC<ModelListProps> = ({ modelName, items }) => {
    
    const columnNames: string[] = Object.getOwnPropertyNames(items[0]);
    const headers = columnNames.map((name, i) => {
        let header = name.trim().replace(/[A-Z]/, (c) => ' ' + c);
        header = header.replace(/^\w/, (c) => c.toUpperCase());
        return <th key={i}>{header}</th>;
    });

    const rows = items.map((val, i) => {
        return <tr>
            {columnNames.map((name, i) => {
                return <td key={i}>
                    {val[name]}
                </td>;
            })}
        </tr>;
    });

    return <div className="model-list">
        <div className="model-list-header">
            <h1>Lista de {modelName.plural}</h1>
            <button>Agregar {modelName.singular}</button>
        </div>
        <table>
            <tr>
                {headers}
            </tr>
            {rows}
        </table>
    </div>;
};

export default ModelList;