import React from 'react';
import { mount } from 'enzyme';
import setup from '../../tests-setup';
import { USER_ACTIONS } from '../../actions';
import { ProductCard } from './ProductCard';
import { CustomButton } from '../CustomButton';

const testProduct = {
    "id": 21,
    "categoryId": 2,
    "image": "https://images.pexels.com/photos/94731/pexels-photo-94731.jpeg?h=350&auto=compress&cs=tinysrgb",
    "name": "Coats Lorem Ipsum 2",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed libero enim, sollicitudin a elit vel, dapibus pellentesque nunc. Phasellus ac rutrum massa. Vivamus non nulla lobortis augue ullamcorper congue.",
    "cost": 409.99,
    "rating": 1,
    "gender": "Man",
    "count": 20,
    "soldCount": 0
};

describe('<ProductCard/> tests', () => {
    it('Expect product card to have image', () => {
        const { element } = setup(<ProductCard {...testProduct}/>)
        const card = mount(element);

        expect(card.find('img').length).toBe(1);
    });

    it('Expect not admin is unable to see remove button', () => {
        const { element, store } = setup(<ProductCard {...testProduct}/>)

        store.dispatch({
            type: USER_ACTIONS.LOGIN_SUCCESS,
            payload: {
                role: 'User'
            }
        });

        const card = mount(element);

        expect(card.find(CustomButton).length).toBe(2);
    });

    it('Expect admin is able to see remove button', () => {
        const { element, store } = setup(<ProductCard {...testProduct}/>)

        store.dispatch({
            type: USER_ACTIONS.LOGIN_SUCCESS,
            payload: {
                role: 'Admin'
            }
        });

        const card = mount(element);

        expect(card.find(CustomButton).length).toBe(3);
    });
});