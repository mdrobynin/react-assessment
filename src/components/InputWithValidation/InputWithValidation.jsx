import React, { useState, useEffect } from 'react';
import './InputWithValidation.scss';

export function InputWithValidation({
        rules,
        type = 'text',
        value = '',
        onError = () => {},
        onChange = () => {},
        ...rest
    }) {
    let [ inputValue, setInputValue ] = useState('');

    useEffect(() => {
        setInputValue(value);
    }, [ value, setInputValue ]);

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
        onChange(event);
    }

    return (
        <input className="input-with-validation"
            {...rest}
            type={type}
            value={inputValue}
            onChange={handleChange}
            onBlur={validate}/>
    )
}
