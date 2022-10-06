import React, { FC } from 'react';
import './Card.css';

type CardProps = {
    iconSrc: string;
    title: string;
    amount: number;
    style?: React.CSSProperties;
};

const Card: FC<CardProps> = ({ iconSrc, title, amount, style }) => {    
    return <div className="card" style={style}>
        <img src={iconSrc} alt={title} />
        <p className="card-title">{title}</p>
        <p className="card-amount">{amount}</p>
    </div>;
};

export default Card;