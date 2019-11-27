import React from 'react';
import './CustomRadioInput.scss';

export function CustomRadioInput({children, ...rest}) {
    return (
        <label className="custom-radio-input-label">
            <input type="radio" {...rest} className="custom-radio-input"/>
            {children}
            <span className="custom-radio-input-icon"></span>
        </label>
    );
}