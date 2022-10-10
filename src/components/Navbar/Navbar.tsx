import React, { FC } from 'react';
import Option from './Option';
import './Navbar.css';
import salesIcon from './imgs/salesIcon.png';
import medsIcon from './imgs/medsIcon.png';
import peopleIcon from './imgs/peopleIcon.png';

const Navbar: FC = () => {
    return <nav>
        <ul>
            <Option 
                imgSrc={peopleIcon}
                imgAlt='people'
                linkTo='people'
            />
            <Option 
                imgSrc={medsIcon}
                imgAlt='meds'
                linkTo='meds'
            />
            <Option 
                imgSrc={salesIcon}
                imgAlt='sales'
                linkTo='sales'
            />
        </ul>
    </nav>;
};

export default Navbar;