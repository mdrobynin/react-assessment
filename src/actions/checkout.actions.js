const CHECKOUT_CONTENT_KEY = 'checkoutContent';

export const CHECKOUT_ACTIONS = {
    LOAD_BASKET_ITEMS: 'LOAD_CHECKOUT_PRODUCTS',
    CLEAR_BASKET: 'CLEAR_BASKET'
};

export function loadCheckoutProducts() {
    return (dispatch, getState) => {
        const { user } = getState();
        const contentStr = localStorage.getItem(CHECKOUT_CONTENT_KEY);
        let basketItems = [];

        if (contentStr) {
            const content = JSON.parse(contentStr);
            basketItems = content[user.userData.login];
        }

        dispatch({
            type: CHECKOUT_ACTIONS.LOAD_BASKET_ITEMS,
            payload: basketItems
        });
    }
}

export function addToBasket(product) {
    return (dispatch, getState) => {
        const { user } = getState();
        const contentStr = localStorage.getItem(CHECKOUT_CONTENT_KEY);

        if (contentStr) {
            const content = JSON.parse(contentStr);
            const basketItems = content[user.userData.login] ? content[user.userData.login] : [];
            const basketItem = basketItems.find(x => x.product.id === product.id);

            if (basketItem) {
                basketItem.count ++;
            } else {
                basketItems.push({ product, count: 1 });
            }

            const newContent = {...content, [user.userData.login]: basketItems };

            localStorage.setItem(CHECKOUT_CONTENT_KEY, JSON.stringify(newContent));

            dispatch({
                type: CHECKOUT_ACTIONS.LOAD_BASKET_ITEMS,
                payload: basketItems
            });
        } else {
            const data = {
                [user.userData.login]: [ { product, count: 1 } ]
            };

            localStorage.setItem(CHECKOUT_CONTENT_KEY, JSON.stringify(data));

            dispatch({
                type: CHECKOUT_ACTIONS.LOAD_BASKET_ITEMS,
                payload: data[user.userData.login]
            });
        }
    }
}

export function removeFromBasket(product) {
    return (dispatch, getState) => {
        const { user } = getState();
        const contentStr = localStorage.getItem(CHECKOUT_CONTENT_KEY);
        const content = JSON.parse(contentStr);
        const basketItems = content[user.userData.login] ? content[user.userData.login] : [];
        const newBasketItems = basketItems.filter(x => x.product.id !== product.id);
        const newContent = {...content, [user.userData.login]: newBasketItems };

        localStorage.setItem(CHECKOUT_CONTENT_KEY, JSON.stringify(newContent));

        dispatch({
            type: CHECKOUT_ACTIONS.LOAD_BASKET_ITEMS,
            payload: newContent[user.userData.login]
        });
    }
}