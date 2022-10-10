import React, { FC } from 'react';
import './MessageScreen.css';

interface props {
    msg: string;
};

const MessageScreen: FC<props> = ({msg}) => {
    return <div className='msg-screen'>
        <p>{msg}</p>
    </div>;
};

export default MessageScreen;