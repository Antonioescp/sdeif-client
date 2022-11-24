import React, { FC, useState } from 'react';
import { Customer } from '../../model/Customer';
import { Person } from '../../model/Person';
import { Address } from '../../model/Address';
import '../style/ClienteForm.css';


const ClienteForm: FC = () => {
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
        const newCustomer: any = new Customer();

        for (let i in datos) {
            if (i in newAddress) {
                newAddress[i] = datos[i];
            }
            else if (i in newPerson) {
                newPerson[i] = datos[i];
            }
        }
        newPerson.address = newAddress;
        newCustomer.person = newPerson;
        newCustomer.save();
    }
    return (
        <div className="cliente-form">

            <form onSubmit={EnviarDatos}>
                <h1>Clientes</h1>
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
                <button type='submit'>Guardar</button>
            </form>
        </div>
    );
};

export default ClienteForm;