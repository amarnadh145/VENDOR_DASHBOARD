import React from 'react'
import { useState } from 'react';
import { API_Path } from '../../helpers/ApiPath';
const AddFirm = () => {
    const [firmName, setFirmName] = useState("")
    const [area, setArea] = useState("")
    const [category, setCategory] = useState([])
    const [region, setRegion] = useState([])
    const [offer, setOffer] = useState("")
    const [file, setFile] = useState(null)

    const imageupload = (e) => {
        const selectImage = e.target.files[0]
        setFile(selectImage)
    }

    const categoryHandler = (e) => {
        const value = e.target.value
        if (category.includes(value)) {
            setCategory(category.filter((item) => item !== value))
        }
        else {
            setCategory([...category, value])
        }
    }
    const regionHandler = (e) => {
        const value = e.target.value
        if (region.includes(value)) {
            setRegion(region.filter((item) => item !== value))
        }
        else {
            setRegion([...region, value])
        }
    }
    const firmHandler = async (e) => {
        e.preventDefault()
        try {
            const loginToken = localStorage.getItem('loginToken')
            if (!loginToken) {
                console.error("user not found")
            }
            const formData = new FormData();
            formData.append('firmName', firmName);
            formData.append('area', area);
            formData.append('offer', offer);
            formData.append('image', file)
            category.forEach((value) => {
                formData.append('category', value);
            })
            region.forEach((value) => {
                formData.append('region', value);
            })
            const response = await fetch(`${API_Path}/firm/add-firm`, {
                method: 'POST',
                headers: {
                    'token': `${loginToken}`
                },
                body: formData
            })
            const data = await response.json()
            if (response.ok) {
                alert("firm added successfully")
            }
            else if (data.message == "vendor can have only one firm") {
                alert("Firm exists, only one firm is allowed")
            } else {
                alert("failed to add firm")
            }
            setArea("")
            setFirmName("")
            setCategory([])
            setRegion([])
            setOffer("")
            setFile(null)
            const firmId = data.firmId
            localStorage.setItem('firmId', firmId)
        }
        catch (error) {
            console.error(error, "failed to add firm")
        }
    }
    return (
        <div className="firmSection">
            <form className='tableForm' onSubmit={firmHandler}>
                <h3>Add Firm</h3>
                <label>Firm Name</label>
                <input type='text' name='firmName' value={firmName} onChange={(e) => setFirmName(e.target.value)} placeholder='Enter Firm Name' /><br />
                <label>Area</label>
                <input type='text' name='area' value={area} onChange={(e) => setArea(e.target.value)} placeholder='Enter Area Name' /><br />
                <div className="checkInp">
                    <label>Category</label>
                    <div className="checkboxContainer">
                        <div className="checkboxItem">
                            <label>Veg</label>
                            <input type="checkbox" checked={category.includes('veg')} value="veg" onChange={categoryHandler} />
                        </div>
                        <div className="checkboxItem">
                            <label>Non-Veg</label>
                            <input type="checkbox" checked={category.includes('non-veg')} value="non-veg" onChange={categoryHandler} />
                        </div>
                    </div>
                </div>

                <div className="checkInp">
                    <label>Region</label>
                    <div className="checkboxContainer">
                        <div className="checkboxItem">
                            <label>South-Indian</label>
                            <input type="checkbox" checked={region.includes('south-indian')} value="south-indian" onChange={regionHandler} />
                        </div>
                        <div className="checkboxItem">
                            <label>North-Indian</label>
                            <input type="checkbox" checked={region.includes('north-indian')} value="north-indian" onChange={regionHandler} />
                        </div>
                        <div className="checkboxItem">
                            <label>Chinese</label>
                            <input type="checkbox" checked={region.includes('chineese')} value="chineese" onChange={regionHandler} />
                        </div>
                        <div className="checkboxItem">
                            <label>Bakery</label>
                            <input type="checkbox" checked={region.includes('bakery')} value="bakery" onChange={regionHandler} />
                        </div>
                    </div>
                </div>

                <label>Offer</label>
                <input type='text' name='offer' value={offer} onChange={(e) => setOffer(e.target.value)} placeholder='Enter Firm Name' /><br />
                <label>Image</label>
                <input type='file' onChange={imageupload} /><br />
                <div className="btnsubmit">
                    <button type='submit'>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default AddFirm
