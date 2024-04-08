import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import Layout from '../components/layout/layout'
import axios from 'axios';
import MyCheckbox from '../components/checkbox';
import MyRadioGroup from '../components/radio';
import { Prices } from '../components/Prices';
import { useCart } from '../context/cart';
import { AiOutlineReload } from "react-icons/ai";
import "../styles/Home.css";
import toast from 'react-hot-toast';

const Home = () => {
    const navigate = useNavigate();
    const { cart, setCart } = useCart();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const allCategories = async () => {
        try {
            const { data } = await axios.get("/api/v1/category/getCategory");
            if (data.success) {
                setCategories(data.category);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        allCategories();
        getTotal();
    }, []);

    //get products
    const getAllProducts = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`/api/v1/product/productList/${page}`);
            setLoading(false);
            setProducts(data.products);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    //getTOtal COunt
    const getTotal = async () => {
        try {
            const { data } = await axios.get("/api/v1/product/productCount");
            setTotal(data?.total);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (page === 1) return;
        loadMore();
    }, [page]);

    //load more
    const loadMore = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`/api/v1/product/productList/${page}`);
            setLoading(false);
            setProducts([...products, ...data?.products]);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    //filter categories
    const handleFilter = (value, id) => {
        let all = [...checked];
        if (value) {
            all.push(id);
        } else {
            all = all.filter((c) => c !== id);
        }
        setChecked(all);
    };

    useEffect(() => {
        if (!checked.length || !radio.length) getAllProducts();
    }, [checked.length, radio.length]);

    useEffect(() => {
        if (checked.length || radio.length) filterProduct();
    }, [checked, radio]);

    //get filterd product
    const filterProduct = async () => {
        try {
            const { data } = await axios.post("/api/v1/product/productFilters", {
                checked,
                radio,
            });
            setProducts(data?.products);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Layout title={'All Products'}>
            {/* banner image */}
            <img
                src="\images\black-friday-elements-assortment_23-2149074076.jpg"
                className="banner-img"
                alt="bannerimage"
                width={"100%"}
            />
            <div className="banner-text">
                <h1>Welcome to Our Store</h1>
                <p>Discover amazing deals on Black Friday</p>
            </div>
            {/* banner image */}
            <div className='container-fluid row mt-3 home-page'>
                <div className='col-md-3 filters'>
                    <h4 className='text-center'>Flter By Category</h4>
                    <div className='d-flex flex-column'>
                        {categories?.map((c) => (
                            <MyCheckbox
                                key={c._id}
                                id={c._id}
                                name={c.name}
                                onChange={(isChecked, categoryId) => handleFilter(isChecked, categoryId)}
                            />
                        ))}

                    </div>
                    <h4 className='text-center mt-4'>Flter By Price</h4>
                    <div className='d-flex flex-column'>
                        <MyRadioGroup
                            options={Prices.map(p => ({ value: p.array, label: p.name }))}
                            onChange={(value) => setRadio(value)}
                        />
                    </div>
                    <div className="d-flex flex-column">
                        <button
                            className="btn btn-danger"
                            onClick={() => window.location.reload()}
                        >
                            RESET FILTERS
                        </button>
                    </div>
                </div>
                <div className='col-md-9'>
                    <h1 className='text-center'>All Products</h1>
                    <div className='d-flex flex-wrap'>
                        {products?.map((p) => (
                            <div className="card m-2" style={{ width: "18rem" }}>
                                <img
                                    src={`/api/v1/product/productPhoto/${p._id}`}
                                    className="card-img-top"
                                    alt={p.name}
                                />
                                <div className="card-body">
                                    <div className='card-name-price'>
                                        <h5 className="card-title">{p.name}</h5>
                                        <h5 className="card-title card-price">
                                            {p.price.toLocaleString("en-PK", {
                                                style: "currency",
                                                currency: "PKR",
                                            })}
                                        </h5>

                                    </div>
                                    <p className="card-text">
                                        {p.description.substring(0, 60)}...
                                    </p>
                                    <div className="card-name-price">
                                        <button className="btn btn-info ms-1"
                                            onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                                        <button
                                            className="btn btn-dark ms-1"
                                            onClick={() => {
                                                setCart([...cart, p]);
                                                toast.success("Item Added to cart");
                                            }}
                                        >
                                            ADD TO CART
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="m-2 p-3">
                        {products && products.length < total && (
                            <button
                                className="btn loadmore"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setPage(page + 1);
                                }}
                            >
                                {loading ? (
                                    "Loading ..."
                                ) : (
                                    <>
                                        {" "}
                                        Loadmore <AiOutlineReload />
                                    </>
                                )}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Home;