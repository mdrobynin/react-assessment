import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ProductCard, Paginator } from 'components';
import { PRODUCT_ACTIONS } from 'actions';
import './ProductsContainer.scss';

export function ProductsContainer() {
    let selectedPage = useSelector(state => state.products.selectedPage);
    let pages = useSelector(state => state.products.pages);
    let products = useSelector(state => state.products.shownProducts);
    let dispatch = useDispatch();

    const selectPage = (page) => {
        dispatch({
            type: PRODUCT_ACTIONS.SELECT_PAGE,
            payload: page
        });
    }

    return (
        <div className="products-container">
            <div className="products-container__paginator">
                <Paginator count={pages} value={selectedPage} onChange={selectPage}/>
            </div>
            <div className="products-container__body">
                {
                    products.map(product => {
                        return (
                            <ProductCard key={product.id} {...product}/>
                        );
                    })
                }
            </div>
        </div>
    );
}
