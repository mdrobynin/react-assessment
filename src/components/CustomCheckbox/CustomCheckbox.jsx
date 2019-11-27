import React from 'react';
import './CustomCheckbox.scss';

export function CustomCheckbox({ children, ...rest }) {
    return (
        <label className="custom-checkbox-label">
            <input type="checkbox" className="custom-checkbox-input" {...rest}/>
            <span className="custom-checkbox-icon"></span>
            {children}
        </label>
    );
}
