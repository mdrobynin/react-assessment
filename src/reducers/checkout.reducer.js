import { CHECKOUT_ACTIONS } from '../actions';

const initialState = {
    basketItems: [],
    itemsCount: 0
};

export default function(state = initialState, action) {
    switch (action.type) {
        case CHECKOUT_ACTIONS.LOAD_BASKET_ITEMS: {
            return {
                ...state,
                basketItems: action.payload.map(x => ({...x, subtotal: x.product.cost * x.count})),
                itemsCount: action.payload.length
            };
        }
        case CHECKOUT_ACTIONS.CLEAR_BASKET: {
            return {...state, basketItems: [], itemsCount: 0 };
        }
        default:
            return state;
    }
}
