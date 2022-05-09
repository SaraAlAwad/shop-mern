const cors = require("cors")
const morgan = require("morgan")
const express = require("express")
const multer = require("multer")
const { doAuthMiddleware } = require("./auth/auth-middleware")
const { addNewProduct } = require("./use-cases/addNewProduct")
const { editProduct } = require("./use-cases/editProduct")
const { listAllProducts } = require("./use-cases/listAllProducts")
const { listAllUsers } = require("./use-cases/listAllUsers")
const { login } = require("./use-cases/login")
const { registerUser } = require("./use-cases/registerUser")
const { showProduct } = require("./use-cases/showProduct")


const PORT = process.env.PORT || 9000
const app = express()
app.use(cors())
app.use(morgan("dev"))
app.use(express.json())

app.get("/", (_, res) => {
    res.send("it works ")
})
// this is the controller layer
app.get("/api/products/all", async (_, res) => {
    try {
        const products = await listAllProducts()
        res.json(products)
    } catch (err) {
        res.status(500).json({ err: error.message || "Unknown error while reading products." })
    }
})
// show product detailes
app.get("/api/products/productDetails/:id", async (req, res) => {
    try {
        const id = req.params.id
        const product = await showProduct({ productId: id })
        res.json(product)
    } catch (error) {
        res.status(500).json({ err: error.message || "Unknown error while reading product." })
    }
})
const upload = multer()
const uploadMiddleware = upload.single("productImg")
app.post("/api/products/add", uploadMiddleware, async (req, res) => {
    try {
        const productInfo = req.body
        console.log("productInfo", productInfo);

        const imageLink = imageBufferToBase64(req.file.buffer, req.file.mimetype,)
        const variations = JSON.parse(productInfo.variations)

        const product = await addNewProduct(...productInfo, variations, imageLink)
        // const product = await addNewProduct(productInfo)

        res.json(product)
    } catch (err) {
        res.status(500).json({ err: error.message || "Unknown error while creating new product." })
    }
})
app.put("/api/products/edit", async (req, res) => {
    try {
        console.log("put method is called", req.body.title);
        console.log("req.body", req.body);
        const productUpdateInfo = req.body
        const products = await editProduct(productUpdateInfo)
        console.log("products", products);
        res.json(products) // here i am returning just the edited product
    } catch (err) {
        console.log(err);
        res.status(500).json("Unknown error while editing product.")
    }
})
app.get("/api/users", async (_, res) => {
    try {
        const users = await listAllUsers()
        res.status(200).json(users)
    } catch (err) {
        res.status(500).json("Unknown error while reading users.")
    }
})
app.post("/api/users/register", async (req, res) => {
    try {
        const userInfo = req.body
        console.log(userInfo);
        const user = await registerUser(userInfo)
        res.status(201).json(user)
    } catch (error) {
        console.log(error)
        res.status(500).json({ err: error.message || "Unknown error while registering new user." })
    }
})

app.post("/api/admin/login", async (req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password
        console.log("email", email);
        console.log("password", password);
        const token = await login({ email, password })
        res.json({ token })
    } catch (error) {
        console.log(error);
        res.status(404).json({ err: "Not found." })
    }
})
app.listen(PORT, () => console.log("Server listening on port", PORT))

