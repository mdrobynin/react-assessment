import React from 'react';
import { ProductCard } from 'components';
import './ProductsContainer.scss';

export function ProductsContainer({ products }) {
    console.log(products);

    return (
        <div className="products-container">
            {
                products.map(product => {
                    return (
                        <ProductCard key={product.id} {...product}/>
                    );
                })
            }
        </div>
    );
}