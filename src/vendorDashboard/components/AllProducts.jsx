import React from 'react'
import { useState, useEffect } from 'react'
import { API_Path } from '../helpers/ApiPath'

const AllProducts = () => {
    const [products, setProducts] = useState([])
    const productsHandler = async () => {
        const firmId = localStorage.getItem("firmId")
        try {
            const response = await fetch(`${API_Path}/product/${firmId}/products`)
            const newProductData = await response.json()
            setProducts(newProductData.products)
        }
        catch (error) {
            console.error(error, "failed to fetch products")
        }
    }


    useEffect(() => {
        productsHandler()
        console.log("this is useeffect")
    }, [])
    const deleteProductById = async (productId) => {
        try {
            const response = await fetch(`${API_Path}/product/${productId}`, {
                method: 'DELETE'
            })
            if (response.ok) {
                setProducts(products.filter(product => product._id !== productId))
                confirm("are you sure you want to delete?")
                alert("product deleted successfully")
            }
        }
        catch (error) {
            console.error("failed to delete product")
            alert("failed to delete product")
        }
    }
    return (
        <div className='productSection'>
            {!products ? (
                <p>No Products addded</p>
            ) : (<table className='product-table'>
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Image</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((item) => {
                        return (
                            <>
                                <tr key={item._id}>
                                    <td>{item.productName}</td>
                                    <td>{item.price}</td>
                                    <td>{item.image && (
                                        <img src={`${API_Path}/uploads/${item.image}`}
                                            alt={item.productName}
                                            style={{ width: '50px', height: '50px' }} />
                                    )}
                                    </td>

                                    <td>
                                        <button style={{ backgroundColor: "black", color: "white", borderRadius: "5px" }} onClick={() => deleteProductById(item._id)} >Delete</button>
                                    </td>

                                </tr>
                            </>
                        )
                    })}
                </tbody>
            </table>
            )}
        </div>
    )
}

export default AllProducts
