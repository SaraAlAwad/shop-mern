import { useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { apiUrl } from "../api/api"
import { MdDeleteForever } from "react-icons/md"


const AddProduct = (props) => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [variations, setVariations] = useState([])
    const [price, setPrice] = useState(0)
    const [productImg, setProductImg] = useState(null)
    const [stocks, setStocks] = useState(0)

    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const navigate = useNavigate()

    const add = (event) => {
        event.preventDefault()
        console.log("clicked");
        const formData = new FormData();
        formData.append("title", title);
        formData.append("price", price)
        formData.append("description", description)
        formData.append("category", category)
        formData.append("stocks", stocks)
        formData.append("variations", JSON.stringify(variations));
        formData.append("productImg", productImg);

        fetch(apiUrl + "/api/products/add", {
            method: "POST",
            headers: {
                token: props.token
            },
            body: formData //JSON.stringify
        })
            .then((resppnse) => resppnse.json())
            .then(result => { //result is an object ? that have the result data value 
                if (result.err) {
                    setError(result.err)
                } else if (result.acknowledged === true && result.insertedId) {
                    navigate("/products/" + result.insertedId)
                    setSuccess(" a new product was successfully added to the db")
                } else {
                    setError("Unknown error, please try again.")
                }

            })

    }

    // if (!props.token) {
    //     return <Navigate to="/" />
    // }
    // else 
    return (
        <form className="flex-v">
            <label htmlFor="title-input">
                Title:
            </label>
            <input id="title-input" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            <label htmlFor="description-input">
                Description:
            </label>
            <textarea id="description-input" type="text" vlaue={description} onChange={(e) => setDescription(e.target.value)} />
            <label htmlFor="description-input">
                Category:
            </label>
            <input id="category-input" type="text" vlaue={category} onChange={(e) => setCategory(e.target.value)} />
            <label htmlFor="price-input">
                Price:
            </label>
            <input id="price-input" type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} />


            <label htmlFor="image-input">
                Product Image:
            </label>
            <input id="image-input" type="file" onChange={(e) => setProductImg(e.target.files[0])} />
            <label htmlFor="stock-count-input">
                Stock Count:
            </label>
            <input id="stock-count-input" type="number" value={stocks} onChange={(e) => setStocks(Number(e.target.value))} />
            <VariationsInput variations={variations} setVariations={setVariations} />
            <button className="btn" onClick={add}>Add Product</button>
            <br />
            {error && <p className="error-message">{error}</p>}
            {success && <p className="message">{success}</p>}
        </form>

    )
}
const VariationsInput = ({ variations, setVariations }) => {
    const [newVariation, setNewVariation] = useState("")

    const addNewVariationToVariationsArray = (event) => {
        event.preventDefault()
        setVariations([...variations, newVariation])
        // new variations array
        setNewVariation("")
    }
    function deleteVariation(event, index) {
        event.preventDefault()
        const nextVariationsArray = variations.filter((_, indexOfVar) => indexOfVar !== index)
        setVariations(nextVariationsArray)
    }

    return <div className="variations-input-container">
        <ul className="variations-display">
            {variations.map((variation, i) =>
                <li key={i}>
                    <span>{variation}</span>
                    <button onClick={(event) => deleteVariation(event, i)}><MdDeleteForever className="icons" /></button>
                </li>)}
        </ul>

        <div className="add-variations-container">
            <label htmlFor="new-variation-input">
                Add Variation:
            </label><br />
            <input id="new-variation-input" type="text" value={newVariation} onChange={(e) => setNewVariation(e.target.value)} />
            <button className="btn" onClick={addNewVariationToVariationsArray}>+</button>
        </div>
    </div>
}
export default AddProduct