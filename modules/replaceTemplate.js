module.exports = (template, product) => {

    let output = template.replace(/{%PRODUCT_NAME%}/g, product.productName);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%ID%}/g, product.id);
    output = output.replace(/{%IMG%}/g, product.image);
    output = output.replace(/{%DESC%}/g, product.description);

    if (!product.organic) {
        output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    }

    return output
}