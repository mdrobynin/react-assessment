import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { StaticRouter } from 'react-router-dom';
import reducers from '../reducers';

export default function(TestedComponent) {
    const store = createStore(reducers, applyMiddleware(thunk));

    const element = <Provider store={store}>
        <StaticRouter>
            {TestedComponent}
        </StaticRouter>
    </Provider>;

    return {
        element,
        store
    }
}