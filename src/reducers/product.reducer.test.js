import { PRODUCT_ACTIONS } from '../actions';
import productReducer, { initialState } from './product.reducer';

describe('product reducer tests', () => {
    it('product loading progress test', () => {
        const modifiedState = productReducer(initialState, {
            type: PRODUCT_ACTIONS.LOAD_PRODUCT_PROGRESS,
            payload: true
        });

        expect(modifiedState.productLoadProgress).toBe(true);
    });

    it('product load test', () => {
        const product = { id: 1, name: 'name', cost: 123 };
        const modifiedState = productReducer(initialState, {
            type: PRODUCT_ACTIONS.LOAD_PRODUCT_SUCCESS,
            payload: product
        });

        expect(modifiedState.product).toBe(product);
    });
});