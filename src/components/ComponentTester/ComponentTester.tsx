import React, { FC, useEffect, useState } from 'react';
import './ComponentTester.css';
import Card from '../Card';
import NavMenu from '../NavMenu';
import { Person } from '../../model';
import NewBrand from '../NewBrand';

const ComponentTester: FC = () => {

  const [people, setPeople] = useState<Array<Person>>();

  useEffect(() => {

    // React recomienda no utilizar funciones async como callback de un useEffect
    // en su lugar recomiendan tener una funcion asyncrona dentro del callback
    (async function() {
      const data = await Person.find({
        relations: {
          customers: true,
          employees: true,
          address: true
        }
      });

      setPeople(data);
    })();
  }, []);

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
    <h1>CRUD</h1>
    <NewBrand />
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
  </div>
};

export default ComponentTester;