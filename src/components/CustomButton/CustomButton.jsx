import React from 'react';
import './CustomButton.scss';

export function CustomButton({ children, onClick = () => {} }) {
    return (
        <button className="custom-button" onClick={onClick}>
            { children }
        </button>
    )
}
