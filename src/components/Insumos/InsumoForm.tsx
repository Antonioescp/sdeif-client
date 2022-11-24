import React, { FC, useState, useEffect } from 'react';
import { Supply } from '../../model/Supply';
import { SupplyCategory } from '../../model/SupplyCategory';
import { Product } from '../../model/Product';
import { Laboratory } from '../../model/Laboratory';
import '../style/ClienteForm.css';

import { useSelector } from 'react-redux';
import { RootState } from '../../store/index';
import { ConnectionStatus } from '../../store/Database';



const InsumoForm: FC = () => {
    const [datosInsumo, setDatos] = useState<any[]>([]);
    const [categorias, setCategorias] = useState<SupplyCategory[]>([]);
    const [laboratorio, setLaboratorio] = useState<Laboratory[]>([]);

    const databaseConnection = useSelector((state: RootState) => state.database.connection);

    useEffect(() => {
        if (databaseConnection === ConnectionStatus.Active) {
            (async () => {
                setCategorias(await SupplyCategory.find())
                setLaboratorio(await Laboratory.find())
            })();
        }
    }, [databaseConnection]);

    const InputChange = (event: any) => {
        setDatos({
            ...datosInsumo,
            [event.target.name]: event.target.value
        })
    }
    const EnviarDatos = (event: any) => {

        event.preventDefault();
        const newSupply: any = new Supply();
        const newProduct: any = new Product();

        for (let i in datosInsumo) {
            if (i in newSupply) {
                newSupply[i] = datosInsumo[i];
                if (i == 'category') {

                    if (categorias.find(p => p.name == datosInsumo[i])) {
                        newSupply[i] = categorias.find(p => p.name == datosInsumo[i]);
                    }
                    else {
                        const newCategory = new SupplyCategory();
                        newCategory.name = datosInsumo[i];
                        newCategory.save();
                        newSupply[i] = newCategory;
                    }
                }
            }
            else if (i in newProduct) {
                newProduct[i] = datosInsumo[i];
                if (i == 'laboratory') {

                    if (laboratorio.find(p => p.name == datosInsumo[i])) {
                        newProduct[i] = laboratorio.find(p => p.name == datosInsumo[i]);
                    }
                    else {
                        const newlab = new Laboratory();
                        newlab.name = datosInsumo[i];
                        newlab.save()
                        newProduct[i] = newlab;
                    }
                }
            }
        }

        newSupply.product = newProduct;
        newSupply.save();
    }
    return (
        <div className="cliente-form">

            <form onSubmit={EnviarDatos}>
                <h1>Insumo</h1>
                <label>
                    Nombre:
                    <input type="text" name='name' placeholder="Algodon" onChange={InputChange} required />
                </label>
                <label>
                    Precio de Venta:
                    <input type="number" name='currentPrice' placeholder="Precio" onChange={InputChange} required />
                </label>
                <label>
                    Cantidad:
                    <input type="number" name='units' placeholder="Unidades" onChange={InputChange} required />
                </label>
                <label>
                    Categoria:
                    <input type="text" list="category" name='category' placeholder="Categoria" onChange={InputChange} required />
                    <datalist id="category">
                        {categorias.map((cat) => {
                            return <option value={cat.name} />
                        })}
                    </datalist>
                </label>

                <label>
                    Laboratorio:
                    <input type="text" list="laboratory" name='laboratory' placeholder="Laboratorio" onChange={InputChange} required />
                    <datalist id="laboratory">
                        {laboratorio.map((lab) => {
                            return <option value={lab.name} />
                        })}
                    </datalist>
                </label>
                <button type='submit'>Guardar</button>
            </form>
        </div>
    );
};

export default InsumoForm;