// este debe ir de primero por el 'reflect-metadata', se necesita para que los decoradores
// de typeorm funcionen correctamente
import appDataSource from './services/DataSource';

import React, { FC, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

import NewBrand from './components/NewBrand';

import { store } from './store';
import { Provider } from 'react-redux';

import { useDispatch, useSelector } from 'react-redux';
import { ConnectionStatus, updateConnectionStatus } from './store/Database';

import './renderer.css';

const appContainer = document.getElementById('app');

const App: FC = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        appDataSource.initialize()
            .then(() => {
                console.log('data source connected');
                dispatch(updateConnectionStatus(ConnectionStatus.Active));
            })
            .catch(err => {
                console.log('couldnt connect', err);
                dispatch(updateConnectionStatus(ConnectionStatus.Error));
            });
    }, []);
    
    return <>
        <NewBrand />
    </>
};

if (appContainer) {
    const root = ReactDOM.createRoot(appContainer);
    root.render(
        <Provider store={store}>
            <App />
        </Provider>
    );
}
else {
    console.error('Error al crear frontend React: Elemento con id "app" no encontrado');
}