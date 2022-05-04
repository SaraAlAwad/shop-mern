// Product
// title
// category what type of sneakers --> not totally implemented
// description
// variations
// price
// stock
// image


function makeProduct({ _id, title, category, description, variations, price, stock, imageLink }) {
    if (!Array.isArray(variations)) {
        throw new Error("Product variations must be an array.")
    }

    return {
        title: title || "New Product",
        category,
        description,
        variations, // : variations || [],
        price,
        stock,
        imageLink: imageLink || "https://www.downloadclipart.net/large/vector-shoes-png-transparent-image.png",
        // createdAt: createdAt || Date.now(), // standard-wert
        _id
    }
}

module.exports = {
    makeProduct
}