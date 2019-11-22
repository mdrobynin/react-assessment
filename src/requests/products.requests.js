import { get } from './helpers';
import { paths } from './config';

export function getProducts() {
    return get(paths.PRODUCTS)
        .then(res => res.status === 200 ? res.json() : null)
        .then(products => {
            if (!products) return null;

            return getCategories().then(categories => {
                if (!categories) return products;

                return products.map((product) => {
                    const productCategory = categories.find(x => x.id === product.categoryId);

                    return productCategory ? {...product, category: productCategory.name } : product;
                });
            });
        });
}

export function getProduct(id) {
    return get(`${paths.PRODUCTS}/${id}`)
        .then(res => res.status === 200 ? res.json() : null)
        .then(product => {
            if (!product) return null;

            return getCategory(product.categoryId).then(category => {
                if (!category) return product;

                return {...product, category: category.name}
            });
        });
}

export function getCategories() {
    return get(paths.CATEGORIES).then(res => res.status === 200 ? res.json() : null);
}

export function getCategory(id) {
    return get(`${paths.CATEGORIES}/${id}`).then(res => res.status === 200 ? res.json() : null);
}