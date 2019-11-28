import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProductsFilter, ProductsContainer } from 'components';
import { fetchProducts, PRODUCT_ACTIONS } from 'actions';
import './ProductListPage.scss';

export function ProductListPage() {
    let dispatch = useDispatch();
    let productsLoadProgress = useSelector(state => state.products.productsLoadProgress);
    let productsLoadError = useSelector(state => state.products.productsLoadError);
    let allProducts = useSelector(state => state.products.allProducts);

    const filterProducts = (filter) => dispatch({
        type: PRODUCT_ACTIONS.FILTER_PRODUCTS,
        payload: filter
    });
    const clearFilter = () => dispatch({ type: PRODUCT_ACTIONS.CLEAR_PRODUCT_FILTER });

    useEffect(() => {
        dispatch(fetchProducts());
    }, []);

    return (
        <div className="product-list">
            <div className="product-list__filter">
                <ProductsFilter
                    products={allProducts}
                    onApplyFilter={filterProducts}
                    onClearFilter={clearFilter}/>
            </div>
            <div className="product-list__container">
                <ProductsContainer/>
            </div>
        </div>
    );
}