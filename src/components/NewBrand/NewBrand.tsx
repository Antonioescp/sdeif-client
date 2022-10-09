import React, { FC, useState } from 'react';
import { Brand } from '../../model';

const NewBrand: FC = () => {

    const [brandName, setBrandName] = useState('');

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

    return <div>
        <label htmlFor="">Nombre de marca: </label>
        <input type="text" value={brandName} onChange={onChangeBrandInput} />
        <button onClick={onCreate}>Create</button>
    </div>;
}

export default NewBrand;