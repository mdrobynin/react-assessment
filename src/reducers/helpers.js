export function applyFilter(products, filter) {
    const {
        availableOnly,
        category,
        gender,
        priceFrom,
        priceTo,
        rating
    } = filter;

    let filteredProducts = [...products];

    if (filteredProducts.length && availableOnly) {
        filteredProducts = filteredProducts.filter(x => x.count > 0);
    }

    if (filteredProducts.length && category && category !== 'None') {
        filteredProducts = filteredProducts.filter(x => x.category === category);
    }

    if (filteredProducts.length && gender && gender !== 'Any') {
        filteredProducts = filteredProducts.filter(x => x.gender === gender);
    }

    if (filteredProducts.length && priceFrom) {
        filteredProducts = filteredProducts.filter(x => x.cost >= Number(priceFrom));
    }

    if (filteredProducts.length && priceTo) {
        filteredProducts = filteredProducts.filter(x => x.cost <= Number(priceTo));
    }

    if (filteredProducts.length && rating) {
        filteredProducts = filteredProducts.filter(x => x.rating >= Number(rating));
    }

    return filteredProducts;
}