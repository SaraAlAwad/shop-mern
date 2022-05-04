import { useNavigate } from "react-router-dom"


import '../App.css';


const ProductView = ({ product }) => {
    const navigate = useNavigate();
    return (
        <article className="card" onClick={() => navigate("/products/productDetails/" + product._id)}>
            <div className="card-body flex-v">
                <img src={product.imageLink} alt={product.title} />
                <h4>{product.title}</h4>
                <p className="card-price"> {product.price}€</p></div>
        </article>

    )
}

export default ProductView