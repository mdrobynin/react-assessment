import { PRODUCT_ACTIONS } from '../actions';
import { applyFilter } from './helpers';

const initialState = {
    productsLoadProgress: false,
    products: [],
    allProducts: [],
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
                allProducts: action.payload,
                products: action.payload,
            };
        }
        case PRODUCT_ACTIONS.LOAD_ALL_PRODUCTS_ERROR: {
            return {
                ...state,
                productsLoadError: true
            };
        }
        case PRODUCT_ACTIONS.FILTER_PRODUCTS: {
            return {
                ...state,
                products: applyFilter(state.allProducts, action.payload)
            }
        }
        case PRODUCT_ACTIONS.CLEAR_PRODUCT_FILTER: {
            return {
                ...state,
                products: state.allProducts
            };
        }
        default:
            return state;
    }
}
