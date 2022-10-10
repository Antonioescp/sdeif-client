// este debe ir de primero por el 'reflect-metadata'
import appDataSource from './services/DataSource';

import React, { FC, useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import NewBrand from './components/NewBrand';
import MessageScreen from './components/MessageScreen';
import './renderer.css';

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
    
    return <>
        {
            dataSourceConnected === null
                ? <MessageScreen msg={'Creando conexion...'} />
                : dataSourceConnected === false 
                    ? <MessageScreen msg={'No es posible conectar'} />
                    : <NewBrand />
        }
    </>
};

if (appContainer) {
    const root = ReactDOM.createRoot(appContainer);
    root.render( <App /> );
}
else {
    console.error('Error al crear frontend React: Elemento con id "app" no encontrado');
}