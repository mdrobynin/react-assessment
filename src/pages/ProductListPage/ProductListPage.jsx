import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { ProductsFilter, ProductsContainer } from 'components';
import { fetchProducts, PRODUCT_ACTIONS } from 'actions';
import './ProductListPage.scss';

export function ProductListPageComponent({
    products,
    loadProducts,
    productsLoadProgress,
    productsLoadError,
    allProducts,
    filterProducts,
    clearFilter
}) {
    useEffect(() => loadProducts(), [ loadProducts ]);

    return (
        <div className="product-list">
            <div className="product-list__filter">
                <ProductsFilter products={allProducts}
                    onApplyFilter={filterProducts}
                    onClearFilter={clearFilter}/>
            </div>
            <div className="product-list__container">
                <ProductsContainer products={products}/>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    const { products, productsLoadProgress, productsLoadError, allProducts } = state.products;

    return {
        products,
        productsLoadProgress,
        productsLoadError,
        allProducts
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadProducts() {
            dispatch(fetchProducts());
        },
        filterProducts(filter) {
            dispatch({ type: PRODUCT_ACTIONS.FILTER_PRODUCTS, payload: filter });
        },
        clearFilter() {
            dispatch({ type: PRODUCT_ACTIONS.CLEAR_PRODUCT_FILTER });
        }
    };
}

export const ProductListPage = connect(mapStateToProps, mapDispatchToProps)(ProductListPageComponent);