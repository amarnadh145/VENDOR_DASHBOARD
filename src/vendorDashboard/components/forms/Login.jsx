import React, { useState } from 'react'
import { API_Path } from '../../helpers/ApiPath'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const loginHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_Path}/vendor/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })
            const data = await response.json()
            if (response.ok) {
                alert("login success")
                setEmail("")
                setPassword("")
                localStorage.setItem('loginToken', data.token)
                window.location.reload()
            }
            const vendorId = data.vendorId
            console.log("checking", vendorId)
            const vendorResponse = await fetch(`${API_Path}/vendor/single-vendor/${vendorId}`)
            const vendorData = await vendorResponse.json()
            if (vendorResponse.ok) {
                const vendorFirmId = vendorData.vendorFirmId
                const vendorFirmName = vendorData.vendor.firm[0].firmName
                console.log(vendorFirmId)
                localStorage.setItem('firmId', vendorFirmId)
                localStorage.setItem('firmName', vendorFirmName)
                window.location.reload()
            }
        }
        catch (error) {
            alert(error, "login failed")
            console.log(error, "login failed")
        }
    }
    return (
        <div className="loginSection">
            <form className='AuthForm' onSubmit={loginHandler}>
                <h3>Vendor Login</h3>
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

export default Login
