import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchProduct } from 'actions';
import { StarRating, FullScreenLoader } from 'components';
import './ProductDetailsPage.scss';

export function ProductDetailsPage() {
    let dispatch = useDispatch();
    let { id } = useParams();
    let productLoadProgress = useSelector(state => state.product.productLoadProgress);
    let {
        category,
        cost,
        description,
        gender,
        image,
        name,
        rating
    } = useSelector(state => state.product.product ? state.product.product : {});
    let productLoadError = useSelector(state => state.product.productLoadError);
    let isUserAdmin = useSelector(state => state.user.isUserAdmin);

    useEffect(() => {
        dispatch(fetchProduct(id));
    }, []);

    const imageLoadErrorHandler = (event) => {
        event.target.src = 'https://via.placeholder.com/500x400';
    }

    return (
        <div className="product-details-wrapper">
            <div className="product-details-wrapper__header">
                <Link to="/products" className="product-details-wrapper__header-link"> Back to product list</Link>
                {
                    isUserAdmin
                        ? <Link to={`/add-edit-product/${id}`} className="product-details-wrapper__header-link"> Edit product </Link>
                        : null
                }
            </div>
            <div className="product-details-wrapper__body">
                {
                    productLoadProgress
                        ? <FullScreenLoader/>
                        : <div className="product-details">
                        <div className="product-details__column">
                            <div className="product-details__image-container">
                                <img src={image} className="product-details__image"
                                    alt="product" onError={imageLoadErrorHandler}/>
                                <StarRating rating={rating}/>
                            </div>
                            <div className="product-details__info">
                                <div className="product-details__cost">
                                    { `${cost}$` }
                                </div>
                                <div className="product-details__gender">
                                    { gender }
                                </div>
                            </div>
                        </div>
                        <div className="product-details__column">
                            <h1 className="product-details__name">
                                {name}
                            </h1>
                            <h2 className="product-details__category">
                                {category}
                            </h2>
                            <div className="product-details__description">
                                {description}
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}
