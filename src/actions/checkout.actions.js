const CHECKOUT_CONTENT_KEY = 'checkoutContent';

export const CHECKOUT_ACTIONS = {
    LOAD_BASKET_ITEMS: '@@CHECKOUT_ACTIONS/LOAD_CHECKOUT_PRODUCTS',
    CLEAR_BASKET: '@@CHECKOUT_ACTIONS/CLEAR_BASKET'
};

function saveCheckoutContent(content) {
    if (typeof content === 'object') {
        localStorage.setItem(CHECKOUT_CONTENT_KEY, JSON.stringify(content));
    }
}

function getCheckoutContent() {
    const contentStr = localStorage.getItem(CHECKOUT_CONTENT_KEY);

    if (contentStr) {
        try {
            return JSON.parse(contentStr);
        } catch (e) {
            return null;
        }
    } else {
        return null;
    }
}

export function loadCheckoutProducts() {
    return (dispatch, getState) => {
        const { user } = getState();
        const content = getCheckoutContent();
        let basketItems = [];

        if (content) {
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
        const content = getCheckoutContent();

        if (content) {
            const basketItems = content[user.userData.login] ? content[user.userData.login] : [];
            const basketItem = basketItems.find(x => x.product.id === product.id);

            if (basketItem) {
                basketItem.count ++;
            } else {
                basketItems.push({ product, count: 1 });
            }

            const newContent = {...content, [user.userData.login]: basketItems };

            saveCheckoutContent(newContent);

            dispatch({
                type: CHECKOUT_ACTIONS.LOAD_BASKET_ITEMS,
                payload: basketItems
            });
        } else {
            const data = {
                [user.userData.login]: [ { product, count: 1 } ]
            };

            saveCheckoutContent(data);

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
        const content = getCheckoutContent();
        const basketItems = content[user.userData.login] ? content[user.userData.login] : [];
        const newBasketItems = basketItems.filter(x => x.product.id !== product.id);
        const newContent = {...content, [user.userData.login]: newBasketItems };

        saveCheckoutContent(newContent);

        dispatch({
            type: CHECKOUT_ACTIONS.LOAD_BASKET_ITEMS,
            payload: newContent[user.userData.login]
        });
    }
}