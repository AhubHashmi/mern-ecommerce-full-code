import React from 'react'
import Layout from '../components/layout/layout'
import { Link } from 'react-router-dom'

const Policy = () => {
    return (
        <Layout title={'Privacy Policy'}>
            <div className='row contact'>
                <div className='col-md-6 p-5'>
                    <img src='/images/pp.jpg' alt='Policy' style={{ width: "100%" }} />
                </div>
                <div className='col-md-4'>
                    <h1 className='bg-dark p-2 text-white text-center'>Privacy Policy</h1>
                    <p className='text-justify mt-2'>
                        <i>
                            At <b>SHOP ON</b>, we are committed to protecting your privacy and ensuring the security of your information.

                            <h4>Information Collection</h4>

                            We collect information about your device and browsing behavior to enhance your shopping experience and process orders efficiently.

                            <h4>Use of Information</h4>

                            We use your information to improve our website, personalize your experience, fulfill orders, and communicate with you.

                            <h4>Your Rights</h4>

                            You have the right to access, update, or delete your information. You can also opt-out of marketing communications.

                            <h4>Contact Us</h4>

                            For any questions or concerns regarding our Privacy Policy, please visit our <span className='footer-link'>
                                <Link to="/contact">Contact Us</Link>
                            </span> page.
                        </i>
                    </p>
                </div>
            </div>
        </Layout>
    )
}

export default Policy