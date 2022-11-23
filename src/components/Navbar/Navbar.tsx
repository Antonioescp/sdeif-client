import React, { FC } from 'react';
import Option from './Option';
import './Navbar.css';
import salesIcon from './imgs/salesIcon.png';
import medsIcon from './imgs/medsIcon.png';
import peopleIcon from './imgs/peopleIcon.png';
import employeeIcon from './imgs/empIcon.png';
import logo from './imgs/farmacia.png';
import list from './imgs/list.png';

const Navbar: FC = () => {
    return <nav>
        <div className="nav-logo">
            <img src={logo} alt="Farmacia" />
            <h5>Farmacia Guadalupe</h5>
        </div>
        <ul>
            <Option
                imgSrc={list}
                imgAlt='list'
                linkTo='list'
                info='Lista'
            />
            <Option
                imgSrc={peopleIcon}
                imgAlt='people'
                linkTo='people'
                info='Clientes'
            />
            <Option
                imgSrc={employeeIcon}
                imgAlt='Employee'
                linkTo='employees'
                info='Trabajadores'
            />
            <Option
                imgSrc={medsIcon}
                imgAlt='meds'
                linkTo='meds'
                info='Productos'
            />
            <Option
                imgSrc={salesIcon}
                imgAlt='sales'
                linkTo='sales'
                info='Transacciones'
            />
        </ul>
    </nav >;
};

export default Navbar;