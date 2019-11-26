import { PRODUCT_ACTIONS } from '../actions';

const initialState = {
    productsLoadProgress: false,
    products: [],
    productsLoadError: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case PRODUCT_ACTIONS.LOAD_ALL_PRODUCTS_PROGRESS: {
            const newState = {
                ...state,
                productsLoadProgress: action.payload
            };

            if (action.payload) {
                newState.productsLoadError = false;
            }

            return newState;
        }
        case PRODUCT_ACTIONS.LOAD_ALL_PRODUCTS_SUCCESS: {
            return {
                ...state,
                products: action.payload
            };
        }
        case PRODUCT_ACTIONS.LOAD_ALL_PRODUCTS_ERROR: {
            return {
                ...state,
                productsLoadError: true
            };
        }
        default:
            return state;
    }
}
