// este debe ir de primero por el 'reflect-metadata'
import appDataSource from './services/DataSource';

import React, { FC, useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';

import ComponentTester from './components/ComponentTester';

const appContainer = document.getElementById('app');

const App: FC = () => {

    const [dataSourceConnected, setDataSourceConnected] = useState<Boolean | null>(null);

    useEffect(() => {
        appDataSource.initialize()
            .then(() => {
                console.log('data source connected');
                setDataSourceConnected(true);
            })
            .catch(err => {
                console.log('couldnt connect', err);
                setDataSourceConnected(false);
            });
    }, []);
    
    return <div>
        {
            dataSourceConnected === null
                ? <h1>Loading database</h1>
                : dataSourceConnected === false 
                    ? <h1>No es posible crear una conexion con la base de datos</h1>
                    : <ComponentTester />
        }
    </div>
};

if (appContainer) {
    const root = ReactDOM.createRoot(appContainer);
    root.render( <App /> );
}
else {
    console.error('Error al crear frontend React: Elemento con id "app" no encontrado');
}