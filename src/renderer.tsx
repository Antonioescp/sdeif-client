// este debe ir de primero por el 'reflect-metadata', se necesita para que los decoradores
// de typeorm funcionen correctamente
import appDataSource from './services/DataSource';

import { FC, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

import { store } from './store';
import { Provider } from 'react-redux';

import { useDispatch } from 'react-redux';
import { ConnectionStatus, updateConnectionStatus } from './store/Database';
import { MemoryRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import ModelList from './components/ModelList';
import CompraForm from './components/Compra/CompraForm';
import UpdateForm from './components/UpdateForm';


import { AllEmployees, AllCustomers, AllMedications, AllTransactions } from './model/views';

import './renderer.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Employee,
    Customer,
    Medication,
    Transaction
} from './model';

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Stack from 'react-bootstrap/Stack';

import * as models from './model';
import { useState } from 'react';
import { BaseEntity } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import InsumoForm from './components/Insumos/InsumoForm';
import ClienteForm from './components/Clientes/ClienteForm';

const appContainer = document.getElementById('app');

const App: FC = () => {

    const dispatch = useDispatch();

    const [modelTabs, setModelTabs] = useState<any[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        appDataSource.initialize()
            .then(() => {
                console.log('data source connected');
                dispatch(updateConnectionStatus(ConnectionStatus.Active));
                setModelTabs(getModelTabs());
            })
            .catch(err => {
                console.log('couldnt connect', err);
                dispatch(updateConnectionStatus(ConnectionStatus.Error));
            });
    }, []);

    const getModelTabs = (): any[] => {
        const onDelete = async (item: BaseEntity) => {
            await item.remove();
        };

        return Object.values(models).map((model) => {
            const modelName = appDataSource.getMetadata(model).name;
            return <Tab eventKey={modelName} title={modelName} key={uuidv4()}>
                <ModelList
                    modelName={modelName}
                    model={model}
                    onDelete={onDelete}
                />
            </Tab>;
        });
    }

    const deleteEmployee = async (item: any) => {
        const employeeView = item as AllEmployees;
        const employee = (await Employee.findBy({ id: employeeView.Id })).pop();
        await employee?.remove();
    };

    const deleteCustomer = async (item: any) => {
        const customerView = item as AllCustomers;
        const customer = (await Customer.findBy({ id: customerView.Id })).pop();
        await customer?.remove();
    };

    const deleteMedication = async (item: any) => {
        const medicationView = item as AllMedications;
        const medication = (await Medication.findBy({ id: medicationView.Id })).pop();
        await medication?.remove();
    }

    const deleteTransaction = async (item: any) => {
        const transactionView = item as AllTransactions;
        const transaction = (await Transaction.findBy({ id: transactionView.Id })).pop();
        await transaction?.remove();
    }

    const newInsumo = () => {
        navigate('/meds/new');
    };

    const newVenta = () => {
        navigate('/sales/new');
    };

    const newCustomer = () => {
        navigate('/people/new');
    };

    const othersView = <Stack>
        <Tabs id="left-tabs-example" className='mb-3' justify>
            {modelTabs}
        </Tabs>
    </Stack>;

    return <>
        <Navbar />
        <main>
            <Routes>
                <Route
                    path='/people/new'
                    element={
                        <ClienteForm />
                    }
                />
                <Route
                    path='/people'
                    element={
                        <ModelList
                            modelName="Cliente"
                            model={AllCustomers}
                            onDelete={deleteCustomer}
                            onCreate={newCustomer}
                        />
                    }
                />
                <Route
                    path='/employees'
                    element={
                        <ModelList
                            modelName="Empleado"
                            model={AllEmployees}
                            onDelete={deleteEmployee}
                        />
                    }
                />
                <Route
                    path='/meds'
                    element={
                        <ModelList
                            modelName="Medicamento"
                            model={AllMedications}
                            onDelete={deleteMedication}
                            onCreate={newInsumo}
                        />
                    }
                />
                <Route
                    path='/meds/new'
                    element={
                        <InsumoForm />
                    }
                />
                <Route
                    path='/sales/new'
                    element={
                        <CompraForm />
                    }
                />
                <Route
                    path='/sales'
                    element={
                        <ModelList
                            modelName="Transaccion"
                            model={AllTransactions}
                            onDelete={deleteTransaction}
                            onCreate={newVenta}
                        />
                    }
                />

                <Route path='/others' element={othersView} />

            </Routes>
        </main>
    </>;
};

if (appContainer) {
    const root = ReactDOM.createRoot(appContainer);
    root.render(
        <Provider store={store}>
            <Router>
                <App />
            </Router>
        </Provider>
    );
}
else {
    console.error('Error al crear frontend React: Elemento con id "app" no encontrado');
}