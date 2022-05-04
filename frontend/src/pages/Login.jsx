import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { apiUrl } from "../api/api"


export const Login = (props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const navigate = useNavigate()

    const login = (event) => {
        console.log("inside login function");
        event.preventDefault()
        console.log("before fetch");
        fetch(apiUrl + "/api/admin/login", {
            mathod: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        })
            .then((response) => response.json())
            .then(result => {
                console.log("result", result);
                if (result.err) {
                    setError("Login Problem")
                }
                else {
                    setError("")
                    const token = result.token
                    props.setToken(token)
                    console.log("token", token);
                    navigate("/") //go to dashboard
                }
            })
            .catch(() => console.log("error in login component"))
            .finally(() => {
                setEmail("")
                setPassword("")
            })


    }
    return (
        <form className="flex-v">
            <label htmlFor="user-email">
                Email:
            </label>
            <input id="user-email" type="email" placeholder="email.." value={email} onChange={(e) => setEmail(e.target.value)} />

            <label htmlFor="user-password">
                Password:
            </label>
            <input id="user-password" type="password" placeholder="password.." value={password} onChange={(e) => setPassword(e.target.value)} />

            <button className="btn" onClick={login}>Login</button>
            {error && <p className="error-message">{error}</p>}
            <br />

            {/* <Link to="/register">Create an Account</Link> */}
        </form>
    )
}
