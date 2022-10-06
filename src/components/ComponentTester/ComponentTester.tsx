import React, { FC } from 'react';
import './ComponentTester.css';
import Card from '../Card';
import NavMenu from '../NavMenu';
import ModelList from '../ModelList';

const ComponentTester: FC = () => {
  
    const navOptions = [
      {
        name: "Home",
        alt: "",
        imgSrc: "https://cdn-icons-png.flaticon.com/512/1203/1203128.png"
      },
      {
        name: "Medicamentos",
        alt: "",
        imgSrc: "https://cdn-icons-png.flaticon.com/512/1203/1203128.png"
      },
      {
        name: "Distribuidores",
        alt: "",
        imgSrc: "https://cdn-icons-png.flaticon.com/512/1203/1203128.png"
      },
      {
        name: "Ventas",
        alt: "",
        imgSrc: "https://cdn-icons-png.flaticon.com/512/1203/1203128.png"
      }
    ];

    return <div className='tester'>

        <h1>Cards</h1>
        <Card 
            iconSrc='https://cdn-icons-png.flaticon.com/512/1546/1546105.png'
            title='Medicamentos'
            amount={100}
            style={{backgroundColor: "#F0F9FF"}}
        />
        <Card 
            iconSrc='https://cdn-icons-png.flaticon.com/512/1389/1389130.png'
            title='Ventas'
            amount={250}
            style={{backgroundColor: "#F0F9FF"}}
        />

        <h1>Nav menu</h1>
        <NavMenu navOptions={navOptions} />

        <h1>Lista de modelos</h1>
        <ModelList
          modelName={{singular: "Medicamento", plural: "Medicamentos"}}
          items={[
            {name: "Toni", email: "a@e.com", phone: 12123, enrollNumber: 123123},
            {name: "Juancho", email: "a@e.com", phone: 98479, enrollNumber: 2},
          ]}
        />

    </div>
};

export default ComponentTester;