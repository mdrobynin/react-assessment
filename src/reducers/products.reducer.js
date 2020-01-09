import { PRODUCT_ACTIONS } from '../actions';
import { applyFilter } from './helpers';

const initialState = {
    productsLoadProgress: false,
    shownProducts: [],
    filteredProducts: [],
    allProducts: [],
    productsLoadError: false,
    selectedPage: 1,
    pages: 1
};

const itemsPerPage = 5;

function getPagesNumber(productsLength) {
    return productsLength === 0 ? 1 : Math.ceil(productsLength/5)
}

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
            const selectedPage = state.selectedPage ? state.selectedPage : 1;
            const offset = (selectedPage - 1) * itemsPerPage;

            return {
                ...state,
                allProducts: action.payload,
                filteredProducts: action.payload,
                shownProducts: action.payload.slice(offset, offset + itemsPerPage),
                pages: getPagesNumber(action.payload.length),
                selectedPage
            };
        }
        case PRODUCT_ACTIONS.LOAD_ALL_PRODUCTS_ERROR: {
            return {
                ...state,
                productsLoadError: true
            };
        }
        case PRODUCT_ACTIONS.FILTER_PRODUCTS: {
            const filteredProducts = applyFilter(state.allProducts, action.payload);
            const shownProducts = filteredProducts.slice(0, itemsPerPage);

            return {
                ...state,
                shownProducts,
                filteredProducts,
                pages: getPagesNumber(filteredProducts.length),
                selectedPage: 1
            }
        }
        case PRODUCT_ACTIONS.CLEAR_PRODUCT_FILTER: {
            return {
                ...state,
                shownProducts: state.allProducts.slice(0, itemsPerPage),
                filteredProducts: state.allProducts,
                pages: getPagesNumber(state.allProducts.length),
                selectedPage: 1
            };
        }
        case PRODUCT_ACTIONS.SELECT_PAGE: {
            const offset = (action.payload - 1) * itemsPerPage;

            return {
                ...state,
                selectedPage: action.payload,
                shownProducts: state.filteredProducts.slice(offset, offset + itemsPerPage)
            };
        }
        default:
            return state;
    }
}
