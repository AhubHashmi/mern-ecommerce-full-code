import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/layout'
import { useAuth } from '../../context/auth'
import UserMenu from '../../components/layout/UserMenu';
import axios from 'axios';

const Dashboard = () => {
    const [auth] = useAuth();
    const [queries, setQueries] = useState([]);

    useEffect(() => {
        const fetchUserQueries = async () => {
            try {
                const response = await axios.get('/api/v1/auth/user-queries');
                setQueries(response.data); // Assuming the response contains the array of queries
            } catch (error) {
                console.error("Error fetching user queries:", error);
            }
        };

        if (auth?.token) {
            fetchUserQueries();
        }
    }, [auth?.token]);

    return (
        <Layout title={"Dashboard"}>
            <div className='container-fluid m-3 p-3'>
                <div className='row'>
                    <div className='col-md-3'>
                        <UserMenu />
                    </div>
                    <div className='col-md-9'>
                        <div className='card w-75 p-3'>
                            <h3>Name : {auth?.user?.name}</h3>
                            <h3>Email : {auth?.user?.email}</h3>
                            <h3>Address : {auth?.user?.address}</h3>
                        </div>
                        <div className='card mt-3'>
                            <h3>Your Queries</h3>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>Query</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {queries.map((query) => (
                                        <tr key={query._id}>
                                            <td>{query.message}</td>
                                            <td>{query.status}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Dashboard;