// este debe ir de primero por el 'reflect-metadata', se necesita para que los decoradores
// de typeorm funcionen correctamente
import appDataSource from './services/DataSource';

import React, { FC, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

import { store } from './store';
import { Provider } from 'react-redux';

import { useDispatch } from 'react-redux';
import { ConnectionStatus, updateConnectionStatus } from './store/Database';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';

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
        <Router>
            <Navbar />
            <main>
                <Routes>
                    <Route path='/people' element={<h1>Hello people</h1>} />
                    <Route path='/meds' element={<h1>Hello meds</h1>} />
                    <Route path='/sales' element={<h1>Hello sales</h1>} />
                    <Route path='/employees' element={<h1>Hello employees</h1>} />
                </Routes>
            </main>
        </Router>
    </>;
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