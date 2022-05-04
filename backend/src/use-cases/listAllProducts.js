const { findAllProduct } = require("../db-access/products-dao");


async function listAllProducts() {
    console.log("List all Products function");
    const products = await findAllProduct()
    const productView = products.map(p => ({
        _id: p._id,
        title: p.title,
        description: p.description,
        price: p.price,
        variations: p.variations,
        stock: p.stock,
        imageLink: p.imageLink,
    }))
    return productView

}
module.exports = {
    listAllProducts
}
