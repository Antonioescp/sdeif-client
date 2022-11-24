import React, { FC, useState, useEffect } from 'react';
import '../style/ClienteForm.css';
import { Person } from '../../model/Person';
import { Address } from '../../model/Address';
import { Employee } from '../../model/Employee';
import { EmployeePosition } from '../../model/EmployeePosition';

import { useSelector } from 'react-redux';
import { RootState } from '../../store/index';
import { ConnectionStatus } from '../../store/Database';

import './EmpleadoForm.css';


const EmpleadoForm: FC = () => {

    const databaseConnection = useSelector((state: RootState) => state.database.connection);
    const [puestos, setPuesto] = useState<EmployeePosition[]>([]);
    useEffect(() => {
        if (databaseConnection === ConnectionStatus.Active) {
            (async () => {
                setPuesto(await EmployeePosition.find())
            })();
        }
    }, [databaseConnection]);

    const [datos, setDatos] = useState<any[]>([]);

    const InputChange = (event: any) => {
        setDatos({
            ...datos,
            [event.target.name]: event.target.value
        })
    }
    const EnviarDatos = (event: any) => {

        event.preventDefault();
        const newAddress: any = new Address();
        const newPerson: any = new Person();
        const newEmployee: any = new Employee();
        for (let i in datos) {
            if (i in newAddress) {
                newAddress[i] = datos[i];
            }
            else if (i in newPerson) {
                newPerson[i] = datos[i];
            }
            else if (i in newEmployee) {
                if (i == 'position') {

                    if (puestos.find(p => p.title == datos[i])) {
                        newEmployee[i] = puestos.find(p => p.title == datos[i]);
                    }
                    else {
                        const newPuesto = new EmployeePosition();
                        newPuesto.title = datos[i];
                        newPuesto.salary = 0;
                        newEmployee[i] = newPuesto;
                    }

                }
                else {
                    newEmployee[i] = datos[i];
                }
            }
        }
        newPerson.address = newAddress;
        newEmployee.person = newPerson;

        newEmployee.save();
    }
    return (
        <div className="cliente-form">
            <form onSubmit={EnviarDatos}>
                <h1>Empleados</h1>
                <label>
                    Nombre:
                    <input type="text" name='name' placeholder="Juan" onChange={InputChange} />
                </label>
                <label>
                    Apellido:
                    <input type="text" name='lastname' placeholder="Perez" onChange={InputChange} />
                </label>
                <label>
                    Telefono:
                    <input type="text" name='phoneNumber' placeholder="8888 9999" onChange={InputChange} />
                </label>
                <label>
                    Ciudad:
                    <input type="text" name='city' placeholder="Managua" onChange={InputChange} />
                </label>
                <label>
                    Barrio:
                    <input type="text" name='neighborhood' placeholder="El Doral" onChange={InputChange} />
                </label>
                <label>
                    Calle:
                    <input type="text" name='street' placeholder="Calle 1" onChange={InputChange} />
                </label>
                <label>
                    Casa:
                    <input type="text" name='houseCode' placeholder="X-24" onChange={InputChange} />
                </label>
                <label>
                    Cargo:
                    <input type="text" list="position" name='position' placeholder="Cajero" onChange={InputChange} />
                    <datalist id="position">
                        {puestos.map((puesto) => {
                            return <option value={puesto.title} />
                        })}
                    </datalist>
                </label>
                <label>
                    Fecha Contrato:
                    <input type="date" name='hiringDate' onChange={InputChange} />
                </label>
                <button type='submit'>Guardar</button>
            </form>
        </div>
    );
};

export default EmpleadoForm;