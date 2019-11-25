import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import { Header } from 'components/Header';
import {
    Checkout,
    ProductListPage,
    Error404Page,
    Error500Page,
    ProductDetailsPage,
    AddEditProductPage
} from 'pages';

export function AppRoutes(props) {
    return (
        <div className="layout">
            <div className="layout__header">
                <Header/>
            </div>
            <div className="layout__body">
                <Switch>
                    <Route path="/" exact>
                        <Redirect to="/products"/>
                    </Route>
                    <Route path="/products/:id">
                        <ProductDetailsPage/>
                    </Route>
                    <Route path="/products">
                        <ProductListPage/>
                    </Route>
                    <Route path="/checkout">
                        <Checkout/>
                    </Route>
                    <Route path="/add-edit-product/:id">
                        <AddEditProductPage/>
                    </Route>
                    <Route path="/add-edit-product">
                        <AddEditProductPage/>
                    </Route>
                    <Route path="/500">
                        <Error500Page/>
                    </Route>
                    <Route path="*">
                        <Error404Page />
                    </Route>
                </Switch>
            </div>
        </div>
    );
}