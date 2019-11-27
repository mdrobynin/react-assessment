import React, { useState, useEffect } from 'react';
import {
    CustomButton,
    InputWithValidation,
    CustomRadioInput, 
    CustomCheckbox,
    CustomSelect
} from 'components';
import './ProductsFilter.scss';

export function ProductsFilter({
    products,
    onApplyFilter = () => {},
    onClearFilter = () => {}
}) {
    const genders = [ 'Any', 'Man', 'Woman', 'Unisex' ];
    let [ query, setQuery ] = useState('');
    let [ categories, setCategories ] = useState(['None']);
    let [ category, setCategory ] = useState('None');
    let [ availableOnly, setAvailableOnly ] = useState(false);
    let [ gender, setGender ] = useState('Any');
    let [ rating, setRating ] = useState('');
    let [ priceFrom, setPriceFrom ] = useState('');
    let [ priceTo, setPriceTo ] = useState('');

    useEffect(() => {
        setCategories(['None', ...Array.from(new Set(products.map(p => p.category)))]);
    }, [ products, setCategories ]);

    const handleRatingChange = (event) => {
        setRating(event.target.value);
    };

    const handlePriceFromChange = (event) => {
        setPriceFrom(event.target.value);
    };

    const handlePriceToChange = (event) => {
        setPriceTo(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setCategory(event);
    };

    const handleQueryChange = (event) => {
        setQuery(event.target.value);
    };

    const applyFilters = () => {
        onApplyFilter({
            category,
            availableOnly,
            gender,
            rating,
            priceFrom,
            priceTo,
            query
        });
    };

    const clearFilters = () => {
        setCategory('None');
        setAvailableOnly(false);
        setGender('Any');
        setRating('');
        setPriceFrom('');
        setPriceTo('');
        setQuery('');

        onClearFilter();
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
                        <CustomCheckbox checked={availableOnly} onChange={handleAvailableChange}/>
                    </div>
                </div>
                <div className="products-filter__item">
                    <div className="products-filter__item-title">
                        Gender
                    </div>
                    <div className="products-filter__item-body">
                        <div  className="products-filter__radio-container">
                            {
                                genders.map(g => {
                                    return (
                                        <CustomRadioInput value={g} name="gender" key={g}
                                            checked={gender === g} onChange={handleGenderChange}>
                                            {g}
                                        </CustomRadioInput>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="products-filter__item">
                    <div className="products-filter__item-title">
                        Category
                    </div>
                    <div className="products-filter__item-body">
                        <CustomSelect
                            options={categories}
                            onChange={handleCategoryChange}
                            value={category}/>
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
                    <div className="products-filter__item-title">
                        Search
                    </div>
                    <div className="products-filter__item-body">
                        <InputWithValidation placeholder="Name" value={query} onChange={handleQueryChange}/>
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