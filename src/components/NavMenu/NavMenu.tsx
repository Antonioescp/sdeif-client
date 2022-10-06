import React, { FC } from 'react';
import './NavMenu.css';

type NavOption = {
    name: string;
    alt: string;
    imgSrc: string;
};

interface NavMenuProps {
    navOptions: NavOption[]
}

const NavMenu: FC<NavMenuProps> = ({ navOptions })=> {

    const elements = navOptions.map((val, i) => {
        return <li key={i}>
            <img src={val.imgSrc} alt={val.alt}/>
            <p>{val.name}</p>      
        </li>;
    });

    return <nav>
        <div id="header">
            <h2>Farma</h2>
        </div>
        <ul>
            {elements}
        </ul>
        <div id="settings">

        </div>
    </nav>;
};

export default NavMenu;