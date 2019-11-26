import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { ProductsFilter, ProductsContainer } from 'components';
import { fetchProducts } from 'actions';
import './ProductListPage.scss';

export function ProductListPageComponent({
    products,
    loadProducts,
    productsLoadProgress,
    productsLoadError
}) {
    useEffect(() => loadProducts(), [ loadProducts ]);

    return (
        <div className="product-list">
            <div className="product-list__filter">
                <ProductsFilter products={products}/>
            </div>
            <div className="product-list__container">
                <ProductsContainer products={products}/>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    const { products, productsLoadProgress, productsLoadError } = state.products;

    return {
        products,
        productsLoadProgress,
        productsLoadError
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadProducts() {
            dispatch(fetchProducts());
        }
    };
}

export const ProductListPage = connect(mapStateToProps, mapDispatchToProps)(ProductListPageComponent);