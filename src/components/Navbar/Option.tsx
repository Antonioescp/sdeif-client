import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import './Option.css';

interface props {
    imgSrc: string;
    imgAlt: string;
    linkTo: string;
}

const Option: FC<props> = ({ imgSrc, imgAlt, linkTo }) => {
    
    const navigate = useNavigate();

    const onClick = (e: React.MouseEvent<HTMLLIElement>) => {
        navigate('/' + linkTo);
    };
    
    return <li onClick={onClick}>
        <img src={imgSrc} alt={imgAlt} />
    </li>;
};

export default Option;