import React from 'react';
import { Route } from 'react-router-dom';

import { Header } from 'components/Header';
import {
    Checkout,
    ProductListPage,
    Error404Page
} from 'pages';

export function AppRoutes(props) {
    return (
        <div className="layout">
            <div className="layout__header">
                <Header/>
            </div>
            <div className="layout__body">
                <Route path="/" exact>
                    <ProductListPage/>
                </Route>
                <Route path="/checkout">
                    <Checkout/>
                </Route>
                <Route path="*">
                    <Error404Page />
                </Route>
            </div>
        </div>
    );
}