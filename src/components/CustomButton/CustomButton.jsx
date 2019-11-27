import React from 'react';
import './CustomButton.scss';

export function CustomButton({ children, onClick = () => {}, theme = 'dark' }) {
    return (
        <button className={theme === 'dark' ? 'custom-button custom-button_dark' : 'custom-button custom-button_light'} onClick={onClick}>
            { children }
        </button>
    )
}
