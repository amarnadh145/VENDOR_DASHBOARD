
import React, { useState } from 'react'
import { API_Path } from '../../helpers/ApiPath';
const Register = ({ showLoginHandler }) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_Path}/vendor/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, password })
            })
            const data = await response.json()
            if (response.ok) {
                console.log(data)
                alert(" vendor registered successfully")
                setEmail("")
                setPassword("")
                setUsername("")
                showLoginHandler()
            }
        }
        catch (error) {
            console.error("registration failed", error)
            alert("registration failed")
        }
    }
    return (
        <div className="registerSection">
            <form className='AuthForm' onSubmit={handleSubmit}>
                <h3>Vendor Register</h3>
                <label>Username</label>
                <input type='text' name='username' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Enter your username' /><br />
                <label>Email</label>
                <input type='text' name='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter your email' /><br />
                <label>Password</label>
                <input type="password" name='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter your password' /><br />
                <div className="btnsubmit">
                    <button type='submit'>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Register
