import React, { FC, useState } from 'react';
import { Brand } from '../../model';

import { useSelector } from 'react-redux';
import { RootState } from '../../store';

import MessageScreen from '../MessageScreen';
import { ConnectionStatus } from '../../store/Database';

const NewBrand: FC = () => {

    const [brandName, setBrandName] = useState('');
    const databaseConnection = useSelector((state: RootState) => state.database.connection);

    const onCreate = (e: React.MouseEvent) => {
        const newBrand = new Brand();
        newBrand.name = brandName;
        newBrand.save()
            .then((val) => {
                console.log('Marca creada: ', val);
            })
            .catch(err => {
                console.log('No se pudo crear la nueva marca: ', err);
            });
    };

    const onChangeBrandInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBrandName(e.target.value.toString());
    };

    const view = <>
        <label htmlFor="">Nombre de marca: </label>
        <input type="text" value={brandName} onChange={onChangeBrandInput} />
        <button onClick={onCreate}>Create</button>
    </>;
 
    return <div>
        {   
            databaseConnection === ConnectionStatus.Active
            ? view
            : <MessageScreen msg={'Not connected to database'} />
        }
    </div>
}

export default NewBrand;