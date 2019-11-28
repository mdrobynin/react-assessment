import { PRODUCT_ACTIONS } from '../actions';

const initialState = {
    productLoadProgress: false,
    product: null,
    productsLoadError: false,
};

export default function(state = initialState, action) {
    switch (action.type) {
        case PRODUCT_ACTIONS.LOAD_PRODUCT_PROGRESS: {
            return {...state, productLoadProgress: action.payload}
        }
        case PRODUCT_ACTIONS.LOAD_PRODUCT_SUCCESS: {
            return {...state, product: action.payload}
        }
        case PRODUCT_ACTIONS.LOAD_PRODUCT_ERROR: {
            return {...state, productsLoadError: true}
        }
        default:
            return state;
    }
}
