import React, { useState } from 'react'
import Layout from '../components/layout/layout'
import toast from 'react-hot-toast';
import { BiPhoneCall, BiSupport, BiMailSend } from 'react-icons/bi'
import axios from "axios";

const Contact = () => {
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [queryData, setQueryData] = useState('');

    //handle form
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("/api/v1/contact/submit-query", {
                name: userName,
                email: userEmail,
                query: queryData,
            });
            if (data?.success) {
                // Handle success, clear form fields, show success message, etc.
                console.log("Query submitted successfully!");
                setUserName('');
                setUserEmail('');
                setQueryData('');
            } else {
                // Handle error, show error message, etc.
                console.error("Error submitting query:", data.message);
            }
        } catch (error) {
            // Handle network error, show error message, etc.
            console.error("Error submitting query:", error);
        }
    };

    return (
        <Layout title={'Contact us'}>
            <div className='row contact'>
                <div className='col-md-6'>
                    <img src='/images/contact.png' alt='Contact Us' style={{ width: "50%" }} />
                </div>
                <div className='col-md-4'>
                    <h1 className='bg-dark p-2 text-white text-center'>Contact Us</h1>
                    <p className='text-justify mt-2'>
                        For any query, feel free to contact us anytime, we are 24x7 available.
                    </p>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Your Name:</label>
                            <input
                                id="name"
                                className="form-control"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                required
                            />
                            <label htmlFor="email" className="form-label">Your Email:</label>
                            <input
                                id="email"
                                className="form-control"
                                value={userEmail}
                                onChange={(e) => setUserEmail(e.target.value)}
                                required
                            />
                            <label htmlFor="query" className="form-label">Your Query:</label>
                            <input
                                id="query"
                                className="form-control"
                                value={queryData}
                                onChange={(e) => setQueryData(e.target.value)}
                                rows={4}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit Query</button>
                    </form>
                    <p className='mt-3'>
                        <BiMailSend /> : ahubhashmi40@gmail.com
                    </p>
                    <p className='mt-3'>
                        <BiPhoneCall /> : 03350900902
                    </p>
                    <p className='mt-3'>
                        <BiSupport /> : 1800-0000-0000 (toll free)
                    </p>
                </div>
            </div>
        </Layout>
    );
};

export default Contact;