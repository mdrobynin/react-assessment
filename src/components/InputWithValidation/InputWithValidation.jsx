import React, { useState } from 'react';
import './InputWithValidation.scss';

export function InputWithValidation({
        rules,
        type = 'text',
        value = '',
        onError = () => {},
        onChange = () => {}
    }) {
    let [ inputValue, setInputValue ] = useState(value);

    const validate = () => {
        if (!rules || rules.length === 0) return;

        const validationResult = rules
            .map(rule => rule(inputValue))
            .filter(result => typeof result === 'string');

        if (validationResult.length) {
            onError(validationResult);
        }
    };

    const handleChange = (event) => {
        setInputValue(event.target.value);
        onChange(event.target.value);
    }

    return (
        <input className="input-with-validation"
            type={type}
            value={inputValue}
            onChange={handleChange}
            onBlur={validate}/>
    )
}
