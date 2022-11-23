import React, { FC, useState } from 'react';
import Button, { ButtonProps } from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/esm/Spinner';
import { ButtonVariant } from 'react-bootstrap/types';


interface ActionButtonProps extends ButtonProps {
    action: () => void
    onComplete: () => void;
    active?: boolean;
    variant?: ButtonVariant;
    size?: 'sm' | 'lg';
}

const ActionButton: FC<ActionButtonProps> = ({
    active,
    variant,
    size,
    action,
    onComplete,
    children
}) => {
    const [isLoading, setLoading] = useState(false);

    const onClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        setLoading(true);
        await action();
        setLoading(false);
        onComplete();
    };

    return <Button
        active={active}
        variant={variant}
        size={size}
        onClick={onClick}
        disabled={isLoading}
    >
        {isLoading
            ? <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
            />
            : children}
    </Button>
};

export default ActionButton;