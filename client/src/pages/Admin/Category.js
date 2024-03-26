import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/layout'
import AdminMenu from '../../components/layout/AdminMenu'
import toast from 'react-hot-toast';
import axios from 'axios';
import CategoryForm from '../../components/Form/CategoryForm';

const Category = () => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [visible, setVisible] = useState(false)
    const [select, setSelect] = useState(null)
    const [updatedName, setUpdatedName] = useState("");

    //handle form
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("/api/v1/category/category", {
                name,
            });
            if (data?.success) {
                toast.success(`${name} created`);
                allCategories();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Somethings wrong in Form Input!");
        }
    };

    //get all categories
    const allCategories = async () => {
        try {
            const { data } = await axios.get("/api/v1/category/getCategory");
            if (data.success) {
                setCategories(data.category);
            }
        } catch (error) {
            console.log(error);
            toast.error("Error in getting all categories!");
        }
    };

    useEffect(() => {
        allCategories();
    }, []);

    //update category
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`/api/v1/category/updateCategory/${select._id}`,
                { name: updatedName });
            if (data.success) {
                toast.success(`${updatedName} is updated!`);
                setSelect(null);
                setUpdatedName("");
                setVisible(false);
                allCategories();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Something went wrong!");
        }
    };

    //delete category
    const handleDelete = async (pId) => {
        try {
            const { data } = await axios.delete(`/api/v1/category/delCategory/${pId}`);
            if (data.success) {
                toast.success(`${name} deleted!`);
                allCategories();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Something went wrong!");
        }
    };
    return (
        <Layout title={"Dashboard - Category"}>
            <div className='container-fluid m-3 p-3'>
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9'>
                        <h1>Manage Category</h1>
                        <div className='p-3 w-50'>
                            <CategoryForm handleSubmit={handleSubmit}
                                value={name}
                                setValue={setName}
                            />
                        </div>
                        <div className='w-75'><table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories?.map((c) => (
                                    <>
                                        <tr>
                                            <td key={c._id}>{c.name}</td>
                                            <td><button className='btn btn-primary ms-2' onClick={() => {
                                                setVisible(true);
                                                setUpdatedName(c.name);
                                                setSelect(c);
                                            }}>Edit</button>
                                                <button className='btn btn-danger ms-2' onClick={() => { handleDelete(c._id) }}>Delete</button>
                                            </td>
                                        </tr>
                                    </>
                                ))}
                            </tbody>
                        </table>
                        </div>
                        <div>
                            {visible && (
                                <div className="modal">
                                    <div className="modal-content">
                                        <span className="close" onClick={() => setVisible(false)}>
                                            &times;
                                        </span>
                                        <CategoryForm
                                            value={updatedName}
                                            setValue={setUpdatedName}
                                            handleSubmit={handleUpdate}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Category