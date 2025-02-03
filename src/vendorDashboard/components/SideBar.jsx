import React from 'react'

const SideBar = ({ showFirmHandler, showProductHandler, showAllProductsHandler, showFirmTitle }) => {
    return (
        <div className="sidebarsection">
            <ul>
                {showFirmTitle ? <li onClick={showFirmHandler}>Add Firm</li> : ""}
                <li onClick={showProductHandler}>Add Product</li>
                <li onClick={showAllProductsHandler}>All Products</li>
            </ul>
        </div>
    )
}

export default SideBar
