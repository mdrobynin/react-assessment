import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ProductCard, CustomButton } from 'components';
import { loadCheckoutProducts, removeFromBasket } from 'actions';
import './Checkout.scss';

export function Checkout(props) {
    let dispatch = useDispatch();
    let basketItems = useSelector(store => store.checkout.basketItems);

    const handleRemove = product => () => {
        dispatch(removeFromBasket(product));
    }

    useEffect(() => {
        dispatch(loadCheckoutProducts());
    }, [ dispatch ]);

    return (
        <div className="checkout">
            <Link to="/products" className="checkout__back"> Back to product list</Link>
           {
               basketItems.length > 0 ?
               basketItems.map((item, index) => (
                    <div className="checkout__item" key={index}>
                        <div className="checkout__product">
                            <ProductCard key={item.product.id} {...item.product}></ProductCard>
                        </div>
                        <div className="checkout__count">
                            {item.count}
                        </div>
                        <div className="checkout__count">
                            {item.subtotal}
                        </div>
                        <div className="checkout__remove">
                            <CustomButton onClick={handleRemove(item.product)} theme="dark">
                                remove
                            </CustomButton>
                        </div>
                    </div>
               ))
               : <div className="checkout__empty">No items here yet</div>
           }
           <div className="checkout__total">
                <div className="checkout__total-text">
                    Total:
                    {
                        basketItems.reduce((res, item) => res + item.subtotal, 0).toFixed(2)
                    }
                </div>
           </div>
        </div>
    );
}