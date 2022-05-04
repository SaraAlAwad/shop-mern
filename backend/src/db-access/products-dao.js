const { ObjectId } = require("mongodb");
const { getDB } = require("./getDB");

async function findAllProduct() {
    const db = await getDB()
    const products = await db.collection("product").find().toArray()
    return products
}
async function findProductById(id) {
    const db = await getDB()
    const product = await db.collection("product").findOne({ _id: new ObjectId(id) })
    return product
}
async function insertOne(product) {
    const db = await getDB()
    const result = await db.collection("product").insertOne(product)
    return result
}
async function updateProduct(productID, productObject) {
    const db = await getDB()
    return db.collection("product").updateOne(
        { _id: new ObjectId(productID) },
        { $set: productObject } //all proprities should be edited
    )
}
// const x = updateProduct("6266a02cac5238cafb6b5648", { title: "test Product with static data", price: 23 })
// console.log("edit product", x); this code did change the value in mongodb
// function updateProduct(productID, productObject) {
//     return getDB().then(db => db.collection("product").updateOne(
//         { _id: new ObjectId(productID) },
//         { $set: productObject } //all proprities should be edited
//     ))
// }
module.exports = {
    findAllProduct,
    insertOne,
    findProductById,
    updateProduct
}
