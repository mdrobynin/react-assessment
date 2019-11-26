import { combineReducers } from 'redux';
import user from './user.reducer';
import products from './products.reducer';

export default combineReducers({
    user,
    products
});
