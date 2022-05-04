// edit product function should be here

const { updateProduct, findeAllProduct } = require("../db-access/products-dao");

async function editProduct({ _id, ...updateInfo }) {
    console.log("edit product function has been called");
    const product = await updateProduct(_id, updateInfo)
    // const products = await findeAllProduct()

    return product

}
module.exports = {
    editProduct
}
