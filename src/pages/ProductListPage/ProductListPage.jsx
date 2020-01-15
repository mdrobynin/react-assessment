import React, { useEffect, Fragment } from 'react';
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
    }, [ dispatch ]);

    return (
        <div className="product-list">
            {
                productsLoadProgress ?
                <div className="product-list__status">
                    Loading...
                </div> :
                <Fragment>
                    {
                        productsLoadError ?
                        <div className="product-list__body">
                            Error occured during product loading
                        </div> : 
                        <div className="product-list__body">
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
                    }
                </Fragment>
            }
        </div>
    );
}