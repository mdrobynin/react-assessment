import React from 'react';
import { ProductsFilter, ProductsContainer } from 'components';
import './ProductListPage.scss';

export function ProductListPage(props) {
    return (
        <div className="product-list">
            <div className="product-list__filter">
                <ProductsFilter/>
            </div>
            <div className="product-list__container">
                <ProductsContainer/>
            </div>
        </div>
    );
}