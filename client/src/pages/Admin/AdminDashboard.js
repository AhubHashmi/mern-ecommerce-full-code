import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/layout'
import AdminMenu from '../../components/layout/AdminMenu'
import { useAuth } from '../../context/auth';
import axios from 'axios';

const AdminDashboard = () => {
    const [auth] = useAuth();
    const [queries, setQueries] = useState([]);

    useEffect(() => {
        const fetchQueries = async () => {
            try {
                const response = await axios.get('/api/v1/contact/queries');
                setQueries(response.data.data);
            } catch (error) {
                console.error("Error fetching queries:", error);
            }
        };

        fetchQueries();
    }, []);

    const markQueryResolved = async (id) => {
        try {
            await axios.put(`/api/v1/contact/queries/${id}`);
            // Update the query status in the frontend state after marking it as resolved
            setQueries((prevQueries) =>
                prevQueries.map((query) =>
                    query._id === id ? { ...query, status: 'resolved' } : query
                )
            );
        } catch (error) {
            console.error("Error marking query as resolved:", error);
        }
    };

    const getStatusMessage = (status) => {
        return status === 'resolved' ? 'Resolved' : 'Pending';
    };

    return (
        <Layout>
            <div className='container-fluid m-3 p-3'>
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9'>
                        <div className='card w-75 p-3'>
                            <h3>Admin Name : {auth?.user?.name}</h3>
                            <h3>Admin Email : {auth?.user?.email}</h3>
                            <h3>Admin Contact : {auth?.user?.phone}</h3>
                        </div>
                        <div className='card mt-3'>
                            <h3>User Queries</h3>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Query</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {queries.map((query) => (
                                        <tr key={query._id}>
                                            <td>{query.name}</td>
                                            <td>{query.email}</td>
                                            <td>{query.message}</td>
                                            <td>{query.status}</td>
                                            <td>{getStatusMessage(query.status)}</td>
                                            <td>
                                                {query.status !== 'resolved' && (
                                                    <button onClick={() => markQueryResolved(query._id)}>
                                                        Mark as Resolved
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default AdminDashboard