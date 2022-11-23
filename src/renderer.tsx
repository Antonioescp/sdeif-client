// este debe ir de primero por el 'reflect-metadata', se necesita para que los decoradores
// de typeorm funcionen correctamente
import appDataSource from './services/DataSource';

import { FC, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

import { store } from './store';
import { Provider } from 'react-redux';

import { useDispatch } from 'react-redux';
import { ConnectionStatus, updateConnectionStatus } from './store/Database';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import ClienteForm from './components/Clientes';
import EmpleadoForm from './components/Empleado';
import ModelList from './components/ModelList';

import { Address } from './model';

import './renderer.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BaseEntity } from 'typeorm';

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
                    <Route
                        path='/list'
                        element={<ModelList
                            modelName="Direccion"
                            model={Address}
                            customColumns={{
                                city: "Ciudad",
                                neighborhood: "Barrio",
                                houseCode: "Codigo de casa",
                                street: "Calle"
                            }}
                            onEdit={(item: BaseEntity) => console.log(item, "editing")}
                        />}
                    />
                    <Route path='/people' element={<ClienteForm />} />
                    <Route path='/employees' element={<EmpleadoForm />} />
                    <Route path='/meds' element={<h1>Hello meds</h1>} />
                    <Route path='/sales' element={<h1>Hello sales</h1>} />
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