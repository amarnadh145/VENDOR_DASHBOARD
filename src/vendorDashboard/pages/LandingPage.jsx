import React, { useState, useEffect } from 'react'
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'
import Login from '../components/forms/Login'
import Register from '../components/forms/Register'
import AddFirm from '../components/forms/AddFirm'
import AddProduct from '../components/forms/AddProduct'
import AllProducts from '../components/AllProducts'

const LandingPage = () => {
    const [showLogin, setShowLogin] = useState(false)
    const [showRegister, setShowRegister] = useState(false)
    const [showFirm, setShowFirm] = useState(false)
    const [showProduct, setShowProduct] = useState(false)
    const [showAllProducts, setShowAllProducts] = useState(false)
    const [showLogOut, setShowLogOut] = useState(false)
    const [showFirmTitle, setShowFirmTitle] = useState(true)
    const showLoginHandler = () => {
        setShowLogin(true)
        setShowRegister(false)
        setShowFirm(false)
        setShowProduct(false)
        setShowAllProducts(false)
    }
    const showRegisterHandler = () => {
        setShowRegister(true)
        setShowLogin(false)
        setShowFirm(false)
        setShowProduct(false)
        setShowAllProducts(false)
    }
    const showFirmHandler = () => {
        if (showLogOut) {
            setShowRegister(false)
            setShowLogin(false)
            setShowFirm(true)
            setShowProduct(false)
            setShowAllProducts(false)
        }
        else {
            alert("Please login")
            setShowLogin(true)
        }
    }
    const showProductHandler = () => {
        if (showLogOut) {
            setShowRegister(false)
            setShowLogin(false)
            setShowFirm(false)
            setShowProduct(true)
            setShowAllProducts(false)
        }
        else {
            alert("Please login")
            setShowLogin(true)
            setShowRegister(false);
        }
    }
    const showAllProductsHandler = () => {
        if (showLogOut) {
            setShowRegister(false)
            setShowLogin(false)
            setShowFirm(false)
            setShowProduct(false)
            setShowAllProducts(true)
        }
        else {
            alert("Please login")
            setShowLogin(true)
            setShowRegister(false);
        }

    }
    useEffect(() => {
        const loginToken = localStorage.getItem('loginToken')
        if (loginToken) {
            setShowLogOut(true)
        }
    }, [])

    useEffect(() => {
        const firmName = localStorage.getItem('firmName')
        if (firmName) {
            setShowFirmTitle(false)
        }
    })





    const logOutHandler = () => {
        confirm("are you sure to logout?")
        localStorage.removeItem('loginToken')
        localStorage.removeItem('firmId')
        localStorage.removeItem('firmName')
        setShowLogOut(false)
        setShowFirmTitle(true)
    }

    return (
        <>
            <section className="landingSection">
                <NavBar showLoginHandler={showLoginHandler} showRegisterHandler={showRegisterHandler} showLogOut={showLogOut} logOutHandler={logOutHandler} />
                <div className="collectionSection">
                    <SideBar showFirmHandler={showFirmHandler} showProductHandler={showProductHandler} showAllProductsHandler={showAllProductsHandler}
                        showFirmTitle={showFirmTitle} />
                    {showLogin && <Login />}
                    {showRegister && <Register showLoginHandler={showLoginHandler} />}
                    {showFirm && showLogOut && <AddFirm />}
                    {showProduct && showLogOut && <AddProduct />}
                    {showAllProducts && showLogOut && <AllProducts />}
                </div>
            </section>
        </>
    )
}

export default LandingPage
