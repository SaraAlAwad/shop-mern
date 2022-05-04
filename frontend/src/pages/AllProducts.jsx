import { useEffect, useState } from "react"
import { apiUrl } from "../api/api"
import Navigation from "../components/Navigation"
import ProductView from "../components/ProductView"

import '../App.css';
import { Link, useNavigate } from "react-router-dom";



const AllProducts = (props) => {
    const [allProducts, setAllProducts] = useState([])

    useEffect(() => {
        const alertError = (error) => alert(error.message)
        fetch(apiUrl + "/api/products/all")
            .then(response => response.json())
            .then((products) => {
                console.log(products)
                if (products.message) {
                    return alertError(products)
                } else {
                    setAllProducts(products)
                }
            })
            .catch(alertError)
    }, [])
    return (
        <main>
            <Navigation />
            <section>

                <div className="container-products flex-r">
                    {allProducts.map(product => <ProductView key={product._id} product={product} />)}</div>
                <Link to={"/addProduct"} className="btn">Add New Product</Link>

            </section> </main>
    )
}

export default AllProducts