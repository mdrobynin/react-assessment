import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchProduct } from 'actions';
import { StarRating, FullScreenLoader } from 'components';
import './AddEditProductPage.scss';

export function AddEditProductPage() {
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
        <div className="add-edit-product-wrapper">
            <div className="add-edit-product-wrapper__header">
                <Link to="/products" className="add-edit-product-wrapper__header-link"> Back to product list</Link>
                {
                    isUserAdmin
                        ? <Link to={`/add-edit-product/${id}`} className="add-edit-product-wrapper__header-link"> Edit product </Link>
                        : null
                }
            </div>
            <div className="add-edit-product-wrapper__body">
                {
                    productLoadProgress
                        ? <FullScreenLoader/>
                        : <div className="add-edit-product">
                        <div className="add-edit-product__column">
                            <div className="add-edit-product__image-container">
                                <img src={image} className="add-edit-product__image"
                                    alt="product" onError={imageLoadErrorHandler}/>
                                <StarRating rating={rating}/>
                            </div>
                            <div className="add-edit-product__info">
                                <div className="add-edit-product__cost">
                                    { `${cost}$` }
                                </div>
                                <div className="add-edit-product__gender">
                                    { gender }
                                </div>
                            </div>
                        </div>
                        <div className="add-edit-product__column">
                            <h1 className="add-edit-product__name">
                                {name}
                            </h1>
                            <h2 className="add-edit-product__category">
                                {category}
                            </h2>
                            <div className="add-edit-product__description">
                                {description}
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}
