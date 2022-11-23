import React, { FC } from 'react';
import '../style/ClienteForm.css';
import './EmpleadoForm.css';


const EmpleadoForm: FC = () => {
    return (
        <div className="cliente-form">
            <form action='#'>
                <h1>Empleados</h1>
                <label>
                    Nombre:
                    <input type="text" name='Nombre' placeholder="Juan" />
                </label>
                <label>
                    Apellido:
                    <input type="text" name='Apellido' placeholder="Perez" />
                </label>
                <label>
                    Telefono:
                    <input type="text" name='Telefono' placeholder="8888 9999" />
                </label>
                <label>
                    Ciudad:
                    <input type="text" name='Ciudad' placeholder="Managua" />
                </label>
                <label>
                    Barrio:
                    <input type="text" name='Barrio' placeholder="El Doral" />
                </label>
                <label>
                    Calle:
                    <input type="text" name='Calle' placeholder="Calle 1" />
                </label>
                <label>
                    Casa:
                    <input type="text" name='Casa' placeholder="X-24" />
                </label>
                <label>
                    Fecha Contrato:
                    <input type="date" name='Fcont' />
                </label>
                <button type='submit'>Guardar</button>
            </form>
        </div>
    );
};

export default EmpleadoForm;