import {
    getProducts,
    getProduct
} from 'requests';

export const PRODUCT_ACTIONS = {
    LOAD_ALL_PRODUCTS_PROGRESS: '@@PRODUCT_ACTIONS/LOAD_ALL_PRODUCTS_PROGRESS',
    LOAD_ALL_PRODUCTS_SUCCESS: '@@PRODUCT_ACTIONS/LOAD_ALL_PRODUCTS_SUCCESS',
    LOAD_ALL_PRODUCTS_ERROR: '@@PRODUCT_ACTIONS/LOAD_ALL_PRODUCTS_ERROR',
    FILTER_PRODUCTS: '@@PRODUCT_ACTIONS/FILTER_PRODUCTS',
    CLEAR_PRODUCT_FILTER: '@@PRODUCT_ACTIONS/CLEAR_PRODUCT_FILTER',
    SELECT_PAGE: '@@PRODUCT_ACTIONS/SELECT_PAGE',
    LOAD_PRODUCT_PROGRESS: '@@PRODUCT_ACTIONS/LOAD_PRODUCT_PROGRESS',
    LOAD_PRODUCT_ERROR: '@@PRODUCT_ACTIONS/LOAD_PRODUCT_ERROR',
    LOAD_PRODUCT_SUCCESS: '@@PRODUCT_ACTIONS/LOAD_PRODUCT_SUCCESS',
}

export function fetchProducts() {
    return dispatch => {
        dispatch({ type: PRODUCT_ACTIONS.LOAD_ALL_PRODUCTS_PROGRESS, payload: true });

        return getProducts()
            .then(products => {
                if (products) {
                    dispatch({
                        type: PRODUCT_ACTIONS.LOAD_ALL_PRODUCTS_SUCCESS,
                        payload: products
                    });
                } else {
                    dispatch({ type: PRODUCT_ACTIONS.LOAD_ALL_PRODUCTS_ERROR });
                }

                dispatch({ type: PRODUCT_ACTIONS.LOAD_ALL_PRODUCTS_PROGRESS, payload: false });
            });
    }
}

export function fetchProduct(id) {
    return dispatch => {
        dispatch({ type: PRODUCT_ACTIONS.LOAD_PRODUCT_PROGRESS, payload: true });

        return getProduct(id)
            .then(product => {
                if (product) {
                    dispatch({
                        type: PRODUCT_ACTIONS.LOAD_PRODUCT_SUCCESS,
                        payload: product
                    });
                } else {
                    dispatch({ type: PRODUCT_ACTIONS.LOAD_PRODUCT_ERROR });
                }

                dispatch({ type: PRODUCT_ACTIONS.LOAD_PRODUCT_PROGRESS, payload: false });
            });
    }
}
