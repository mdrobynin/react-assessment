import { combineReducers } from 'redux';
import user from './user.reducer';
import products from './products.reducer';
import product from './product.reducer';

export default combineReducers({
    user,
    products,
    product
});
