import React, { useState } from 'react';
import { CustomButton, InputWithValidation } from 'components';
import './ProductsFilter.scss';

export function ProductsFilter({products}) {
    const categories = [
        'None',
        'Category',
        'Sample',
        'Another'
    ];

    let [ availableOnly, setAvailableOnly ] = useState(false);
    let [ gender, setGender ] = useState('unisex');
    let [ rating, setRating ] = useState('');
    let [ priceFrom, setPriceFrom ] = useState('');
    let [ priceTo, setPriceTo ] = useState('');

    const handleRatingChange = (event) => {
        setRating(event.target.value);
    };

    const handlePriceFromChange = (event) => {
        setPriceFrom(event.target.value);
    };

    const handlePriceToChange = (event) => {
        setPriceTo(event.target.value);
    };

    const applyFilters = () => {

    };

    const clearFilters = () => {

    };

    const handleAvailableChange = (event) => {
        setAvailableOnly(event.target.checked);
    }

    const handleGenderChange = (event) => {
        setGender(event.target.value);
    }

    return (
        <div className="products-filter">
            <div className="products-filter__row">
                <div className="products-filter__item">
                    <div className="products-filter__item-title">
                        Available only
                    </div>
                    <div className="products-filter__item-body">
                        <input type="checkbox" checked={availableOnly} onChange={handleAvailableChange}/>
                    </div>
                </div>
                <div className="products-filter__item">
                    <div className="products-filter__item-title">
                        Gender
                    </div>
                    <div className="products-filter__item-body">
                        <div  className="products-filter__radio-container">
                            <label className="products-filter__radio-label">
                                <input type="radio" value="male" name="gender"
                                    checked={gender === 'male'} onChange={handleGenderChange}
                                    className="products-filter__radio-input"/>
                                Male
                            </label>
                            <label className="products-filter__radio-label">
                                <input type="radio" value="female" name="gender"
                                    checked={gender === 'female'} onChange={handleGenderChange}
                                    className="products-filter__radio-input"/>
                                Female
                            </label>
                            <label className="products-filter__radio-label">
                                <input type="radio" value="unisex" name="gender"
                                    checked={gender === 'unisex'} onChange={handleGenderChange}
                                    className="products-filter__radio-input"/>
                                Unisex
                            </label>
                        </div>
                    </div>
                </div>
                <div className="products-filter__item">
                    <div className="products-filter__item-title">
                        Category
                    </div>
                    <div className="products-filter__item-body">
                        <select>
                            {categories.map(category => <option value={category} key={category}>{category}</option>)}
                        </select>
                    </div>
                </div>
                <div className="products-filter__item">
                    <div className="products-filter__item-title">
                        Rating
                    </div>
                    <div className="products-filter__item-body">
                        <InputWithValidation placeholder="Rating" value={rating} onChange={handleRatingChange}/>
                    </div>
                </div>
            </div>
            <div className="products-filter__row">
                <div className="products-filter__item">
                    <div className="products-filter__item-title">
                        Price
                    </div>
                    <div className="products-filter__item-body">
                        <InputWithValidation placeholder="From" value={priceFrom} onChange={handlePriceFromChange}/>
                        <InputWithValidation placeholder="To" value={priceTo} onChange={handlePriceToChange}/>
                    </div>
                </div>
                <div className="products-filter__item">
                    <div className="products-filter__item-body">
                        <CustomButton onClick={applyFilters}> apply </CustomButton>
                        <CustomButton onClick={clearFilters}> clear </CustomButton>
                    </div>
                </div>
            </div>
        </div>
    );
}