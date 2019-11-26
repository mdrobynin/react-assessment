import React from 'react';
import { StarRating, CustomButton } from 'components';
import './ProductCard.scss';

export function ProductCard({
    category,
    cost,
    image,
    name,
    rating
}) {
    const handleImageLoadError = (event) => {
        event.target.src = 'https://via.placeholder.com/500x400';
    };

    return (
        <div className="product-card">
            <div className="product-card__image-container">
                <img src={image} alt="product"
                    className="product-card__image"
                    onError={handleImageLoadError}/>
                <StarRating rating={rating}/>
            </div>
            <div className="product-card__name">
                {name}
            </div>
            <div className="product-card__category">
                {category}
            </div>
            <div className="product-card__footer">
                <span className="product-card__cost">{cost}</span>
                <CustomButton>Buy</CustomButton>
                <CustomButton>Details</CustomButton>
            </div>
        </div>
    );
}