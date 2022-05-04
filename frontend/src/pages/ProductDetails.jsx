import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { apiUrl } from "../api/api"
import '../App.css';

const ProductDetails = () => {
    const { productId } = useParams()
    const [product, setProduct] = useState([])
    const [error, setError] = useState("")

    useEffect(() => {
        fetch(apiUrl + "/api/products/productDetails/" + productId)
            .then(response => response.json())
            .then((foundProduct) => {
                if (foundProduct.message) {
                    return setError(foundProduct.message)

                } else {
                    return setProduct(foundProduct)
                }
            })
    }, [productId])
    console.log("product before return", product);
    return (
        <section className="container-product">
            <Link to="/AllProducts" className="text-link">Back to all Products</Link>
            {product && <article>
                <img src={product.imageLink} alt={product.title} />
                <h5>{product.title} – {product.price}€</h5>
                <p className="product-descripton">
                    {product.description}
                </p>
                <p>Category: {product.category}</p>
                <p>In Stock: {product.stock}</p>
                <p>Available Size:</p>
                <ul>
                    {product.variations?.map(variation => <li key={variation}>{variation}</li>)}
                </ul>

                <Link className="btn" to={"/"}>Delete</Link>
                <Link className="btn" to={"/EditProduct"}>Edit</Link>
            </article>}

            <div>{error}</div>

        </section>
    )
}

export default ProductDetails