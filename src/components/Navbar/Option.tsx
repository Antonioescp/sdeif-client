import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import './Option.css';

interface props {
    imgSrc: string;
    imgAlt: string;
    linkTo: string;
    info: string
}

const Option: FC<props> = ({ imgSrc, imgAlt, linkTo, info }) => {

    const navigate = useNavigate();

    const onClick = (e: React.MouseEvent<HTMLLIElement>) => {
        navigate('/' + linkTo);
    };

    return <li onClick={onClick}>
        <img src={imgSrc} alt={imgAlt} />
        <h5>{info}</h5>
    </li>;
};

export default Option;