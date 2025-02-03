import React from 'react'

const NavBar = ({ showLoginHandler, showRegisterHandler, showLogOut, logOutHandler }) => {
    const firmName = localStorage.getItem('firmName')

    return (
        <div className="navsection">
            <div className="company">
                Vendor Dashboard
            </div>
            <div className="firmName">
                <h3>FirmName :{firmName}</h3>
            </div>
            <div className="userauth">
                {!showLogOut ? <>
                    <span onClick={showLoginHandler}>Login /</span>
                    <span onClick={showRegisterHandler}>Register</span>
                </> : <span onClick={logOutHandler}>Logout</span>}
            </div>
        </div>
    )
}

export default NavBar
