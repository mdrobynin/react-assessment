import {
    getProducts
} from 'requests';

export const PRODUCT_ACTIONS = {
    LOAD_ALL_PRODUCTS_PROGRESS: '@@PRODUCT_ACTIONS/LOAD_ALL_PRODUCTS_PROGRESS',
    LOAD_ALL_PRODUCTS_SUCCESS: '@@PRODUCT_ACTIONS/LOAD_ALL_PRODUCTS_SUCCESS',
    LOAD_ALL_PRODUCTS_ERROR: '@@PRODUCT_ACTIONS/LOAD_ALL_PRODUCTS_ERROR',
    FILTER_PRODUCTS: '@@PRODUCT_ACTIONS/FILTER_PRODUCTS',
    CLEAR_PRODUCT_FILTER: '@@PRODUCT_ACTIONS/CLEAR_PRODUCT_FILTER',
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