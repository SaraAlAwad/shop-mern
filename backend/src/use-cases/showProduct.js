const { findProductById } = require("../db-access/products-dao");


async function showProduct({ productId }) {
    const product = await findProductById(productId)
    const productView = productToProductView(product)
    return productView
}
function productToProductView(product) {
    console.log("inside productToProductView", product);
    const productCopy = { ...product }

    return productCopy
}
module.exports = {
    showProduct
}