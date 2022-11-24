import React, { FC, useState, useEffect } from 'react';
import { Distributor } from '../../model/Distributor';
import { DistributorToProduct } from '../../model/DistributorToProduct';
import { Product } from '../../model/Product';
import { Supply } from '../../model/Supply';
import '../style/ClienteForm.css';

import { useSelector } from 'react-redux';
import { RootState } from '../../store/index';
import { ConnectionStatus } from '../../store/Database';


const CompraForm: FC = () => {

    const databaseConnection = useSelector((state: RootState) => state.database.connection);
    const [dist, setDist] = useState<Distributor[]>([]);
    const [insumo, setIns] = useState<Supply[]>([]);
    const [prod, setPrd] = useState<Product[]>([]);

    useEffect(() => {
        if (databaseConnection === ConnectionStatus.Active) {
            (async () => {
                setDist(await Distributor.find())
                setIns(await Supply.find())
                setPrd(await Product.find())
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
        const newCompra: any = new DistributorToProduct();

        for (let i in datos) {
            if (i in newCompra) {
                newCompra[i] = datos[i];
            }
            if (i == 'distributor') {

                if (dist.find(di => di.name == datos[i])) {
                    newCompra[i] = prod.find(p => p.id)
                    dist.find(p => p.name == datos[i]);
                }
                else {
                    const newDist = new Distributor();
                    newDist.name = datos[i];
                    newCompra.Distributor = newDist;
                }
            }
            if (i == 'product') {

                if (insumo.find(di => di.name == datos[i])) {
                    const produ = insumo.find(di => di.name == datos[i])
                    console.log(produ?.product)
                }

            }
        }
        console.log(newCompra)
        newCompra.save();
    }
    return (
        <div className="cliente-form">

            <form onSubmit={EnviarDatos}>
                <h1>Compra de Productos</h1>
                <label>
                    Distribuidor:
                    <input type="text" list="distributor" name='distributor' placeholder="Distribuidor" onChange={InputChange} />
                    <datalist id="distributor">
                        {dist.map((d) => {
                            return <option value={d.name} />
                        })}
                    </datalist>
                </label>
                <label>
                    Producto:
                    <input type="text" list="product" name='product' placeholder="Producto" onChange={InputChange} />
                    <datalist id="product">
                        {insumo.map((p) => {
                            return <option value={p.name} />
                        })}
                    </datalist>
                </label>
                <label>
                    Cantidad:
                    <input type="number" name='quantity' onChange={InputChange} />
                </label>
                <label>
                    Precio:
                    <input type="number" step="any" name='price' placeholder="Precio" onChange={InputChange} />
                </label>
                <button type='submit'>Guardar</button>
            </form>
        </div>
    );
};

export default CompraForm;