import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/layout'
import AdminMenu from '../../components/layout/AdminMenu'
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MySelect from '../../components/select';

const Product = () => {
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("");
    const [photo, setPhoto] = useState("");
    const navigate = useNavigate();

    //get all categories
    const allCategories = async () => {
        try {
            const { data } = await axios.get("/api/v1/category/getCategory");
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error);
            toast.error("Error in getting all categories!");
        }
    };

    useEffect(() => {
        allCategories();
    }, []);

    //create product function
    const handleCreate = async (e) => {
        e.preventDefault()
        try {
            const productData = new FormData()
            productData.append("name", name)
            productData.append("description", description)
            productData.append("price", price)
            productData.append("quantity", quantity)
            productData.append("photo", photo)
            productData.append("category", category)
            const { data } = axios.post("/api/v1/product/product", productData);
            if (data?.success) {
                toast.error(data?.message)
            } else {
                toast.success('Product Created Successfully!')
                navigate('/dashboard/admin/products')
            }
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong!')
        }
    };

    return (
        <Layout title={"Dashboard - Products"}>
            <div className='container-fluid m-3 p-3'>
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9'>
                        <h1>All Products</h1>
                        <div className='m-1 w-75'>
                            <MySelect
                                options={categories.map(c => ({ value: c._id, label: c.name }))}
                                onChange={(value) => setCategory(value)}
                            />
                            <div className='mb-3'>
                                <label className='btn btn-outline-secondary col-md-12'>
                                    {photo ? photo.name : "Upload Photo"}
                                    <input
                                        type='file'
                                        name='photo'
                                        accept='image/*'
                                        onChange={(e) => setPhoto(e.target.files[0])}
                                        hidden
                                    />
                                </label>
                            </div>
                            <div className='mb-3'>
                                {photo && (
                                    <div className='text-center'>
                                        <img src={URL.createObjectURL(photo)}
                                            alt='product_photo'
                                            height={"200px"}
                                            className='img img-responsive' />
                                    </div>
                                )}
                            </div>
                            <div className='mb-3'>
                                <input type='text'
                                    value={name}
                                    placeholder='write a name'
                                    className='form-control'
                                    onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className='mb-3'>
                                <input type='text'
                                    value={description}
                                    placeholder='write a description'
                                    className='form-control'
                                    onChange={(e) => setDescription(e.target.value)} />
                            </div>
                            <div className='mb-3'>
                                <input type='number'
                                    value={price}
                                    placeholder='write price'
                                    className='form-control'
                                    onChange={(e) => setPrice(e.target.value)} />
                            </div>
                            <div className='mb-3'>
                                <input type='number'
                                    value={quantity}
                                    placeholder='write a quantity'
                                    className='form-control'
                                    onChange={(e) => setQuantity(e.target.value)} />
                            </div>
                            <div className='mb-3'>
                                <MySelect
                                    options={[
                                        { value: "0", label: "No" },
                                        { value: "1", label: "Yes" }
                                    ]}
                                    onChange={(value) => setShipping(value)}
                                />
                            </div>
                            <div className='mb-3'>
                                <button className='btn btn-primary' onClick={handleCreate}>Create Product</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Product