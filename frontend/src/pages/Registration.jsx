import { Link } from "react-router-dom";
import { useState } from "react";
import { apiUrl } from "../api/api";

const Registration = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const register = async (event) => {
        event.preventDefault()

        if (password !== passwordConfirm) {
            setError("Password must match with password confirmation!")
            return
        }
        try {
            const response = await fetch(apiUrl + "/api/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, password })
            })
            const result = await response.json()
            console.log("result", result); //must try
            if (result.err) {
                setError(result.err)
            } else if (result.acknowledged === true && result.insertedId) {
                console.log("result 2", result)
                setSuccess("Your account was created successfuly, please login now!")
                setError("")
                setName("")
                setEmail("")
                setPassword("")
                setPasswordConfirm("")
            }
        } catch (error) {
            console.log(error);
            setError("a problem with registration..")
        }
    }
    return (
        <div>Registration
            <form className="flex-v">
                <label htmlFor="user-name">
                    Name:
                </label>
                <br></br>
                <input id="user-name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                <br />
                <label htmlFor="user-email">
                    Email:
                </label><br />
                <input id="user-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <br />
                <label htmlFor="user-password">
                    Password:
                </label>
                <br />
                <input id="user-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <br />
                <label htmlFor="user-password-confirm">
                    Confirm Password:
                </label>
                <br />
                <input id="user-password-confirm" type="password" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
                <br />
                <button className="btn" onClick={register}>Signup</button>
                {error && <p className="messages error">{error}</p>}
                {success && <p className="message">{success}</p>}
                <p>Already have an account? please <Link to="/login">Login</Link></p>

            </form>
        </div>
    )
}

export default Registration