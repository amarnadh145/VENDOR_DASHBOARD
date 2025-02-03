import React from 'react'
import { useState } from 'react'
import { API_Path } from '../../helpers/ApiPath';
const AddProduct = () => {
    const [productName, setProductName] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("non-veg")
    const [bestseller, setBestseller] = useState(false)
    const [description, setDescription] = useState("")
    const [file, setFile] = useState(null)
    const imageupload = (e) => {
        const selectImage = e.target.files[0]
        setFile(selectImage)
    }

    const categoryHandler = (e) => {
        const value = e.target.value
        setCategory(value)

    }
    const bestsellerHandler = (e) => {
        const value = e.target.value === 'true'
        setBestseller(value)
    }
    const productHandler = async (e) => {
        e.preventDefault()
        try {
            const loginToken = localStorage.getItem('loginToken')
            const firmId = localStorage.getItem('firmId')
            if (!firmId || !loginToken) {
                console.error("firm not found")
            }
            const formData = new FormData();
            formData.append('productName', productName);
            formData.append('price', price);
            formData.append('description', description);
            formData.append('image', file)
            const response = await fetch(`${API_Path}/product/add-product/${firmId}`, {
                method: 'POST',
                body: formData
            })
            if (response.ok) {
                const data = await response.json()
                alert("product added successfully")
                setPrice("")
                setProductName("")
                setCategory([])
                setBestseller(false)
                setDescription("")
                setFile(null)
            }
        }
        catch (error) {
            console.error(error, "failed to add product")
        }
    }
    return (
        <div className="productSection">
            <form className='tableForm' onSubmit={productHandler}>
                <h3>Add Product</h3>
                <label>Product Name</label>
                <input type='text' name='productName' value={productName} onChange={(e) => setProductName(e.target.value)} placeholder='Enter Product Name' /><br />
                <label>Price</label>
                <input type='text' name='price' value={price} onChange={(e) => setPrice(e.target.value)} placeholder='Enter Price' /><br />
                <div className="checkInp">
                    <label>Category</label>
                    <div className="checkboxContainer">
                        <div className="checkboxItem">
                            <label>Veg</label>
                            <input type="radio" value="veg" checked={category === "veg"} onChange={categoryHandler} />
                        </div>
                        <div className="checkboxItem">
                            <label>Non-Veg</label>
                            <input type="radio" value="non-veg" checked={category === "non-veg"} onChange={categoryHandler} />
                        </div>
                    </div>
                </div>
                <div className="checkInp">
                    <label>Best Seller</label>
                    <div className="checkboxContainer">
                        <div className="checkboxItem">
                            <label>Yes</label>
                            <input type="radio" value="true" checked={bestseller === true} onChange={bestsellerHandler} />
                        </div>
                        <div className="checkboxItem">
                            <label>No</label>
                            <input type="radio" value="false" checked={bestseller === false} onChange={bestsellerHandler} />
                        </div>
                    </div>
                </div>
                <label>Description</label>
                <input type='text' value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Enter Description' /><br />
                <label>Image</label>
                <input type='file' onChange={imageupload} /><br />
                <div className="btnsubmit">
                    <button type='submit'>Submit</button>
                </div>
            </form>
        </div>

    )
}

export default AddProduct
