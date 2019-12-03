import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { StarRating, CustomButton } from 'components';
import { removeProduct } from 'actions';
import './ProductCard.scss';

export function ProductCard({
    category,
    cost,
    image,
    name,
    rating,
    id
}) {
    let isUserAdmin = useSelector(state => state.user.isUserAdmin);
    let dispatch = useDispatch();

    const handleImageLoadError = (event) => {
        event.target.src = 'https://via.placeholder.com/500x400';
    };

    const handleRemove = id => () => {
        dispatch(removeProduct(id));
    }

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
                {
                    isUserAdmin ? <CustomButton onClick={handleRemove(id)}> Remove </CustomButton> : null
                }
                <CustomButton>Buy</CustomButton>
                <Link to={`/products/${id}`}>
                    <CustomButton>Details</CustomButton>
                </Link>
            </div>
        </div>
    );
}