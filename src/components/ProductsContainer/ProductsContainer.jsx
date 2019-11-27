import React from 'react';
import { connect } from 'react-redux';
import { ProductCard, Paginator } from 'components';
import { PRODUCT_ACTIONS } from 'actions';
import './ProductsContainer.scss';

export function ProductsContainerComponent({ products, selectedPage, pages, selectPage }) {
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

const mapStateToProps = state => {
    return {
        selectedPage: state.products.selectedPage,
        pages: state.products.pages
    };
};

const mapDispatchToProps = dispatch => {
    return {
        selectPage(page) {
            dispatch({ type: PRODUCT_ACTIONS.SELECT_PAGE, payload: page })
        }
    };
}

export const ProductsContainer = connect(mapStateToProps, mapDispatchToProps)(ProductsContainerComponent);