import React from 'react'
import Layout from '../components/layout/layout'
import { BiPhoneCall, BiSupport, BiMailSend } from 'react-icons/bi'

const Contact = () => (
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
                <p className='mt-3'>
                    <BiMailSend /> : help@ecommerce.com
                </p>
                <p className='mt-3'>
                    <BiPhoneCall /> : 01234567891
                </p>
                <p className='mt-3'>
                    <BiSupport /> : 1800-0000-0000 (toll free)
                </p>
            </div>
        </div>
    </Layout>
)

export default Contact