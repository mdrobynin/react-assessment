import React, { useState, useEffect } from 'react';
import './CustomSelect.scss';

export function CustomSelect({ options, value, onChange = () => {}}) {
    let [ selectedOption, setSelectedOption ] = useState(value);
    let [ optionsVisible, setOptionsVisible ] = useState(false);

    useEffect(() => {
        if (value !== selectedOption) {
            setSelectedOption(value);
        }
    }, [ value, selectedOption, setSelectedOption ]);

    const handleFieldClick = () => {
        setOptionsVisible(!optionsVisible);
    }

    const handleOptionSelect = (option) => () => {
        setSelectedOption(option);
        onChange(option);
        setOptionsVisible(false);
    }

    return (
        <div className="custom-select">
            <div className="custom-select__field" onClick={handleFieldClick}>
                <div className="custom-select__field-text">
                    {selectedOption}
                </div>
                <div className="custom-select__field-icon">
                    <i className="material-icons">
                        keyboard_arrow_down
                    </i>
                </div>
            </div>
            <div className="custom-select__options" style={{display: optionsVisible ? 'block' : 'none'}}>
                {
                    options.map(option => {
                        return (
                            <div key={option}
                                onClick={handleOptionSelect(option)}
                                className={ selectedOption === option
                                    ? 'custom-select__option custom-select__option_selected'
                                    : 'custom-select__option' }>
                                {option}
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}