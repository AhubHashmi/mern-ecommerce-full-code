import React from 'react'
import Layout from '../components/layout/layout'

const About = () => {
    return (
        <Layout title={'About us'}>
            <div className='row contact'>
                <div className='col-md-6'>
                    <img src='/images/about.png' alt='Contact Us' style={{ width: "100%" }} />
                </div>
                <div className='col-md-4'>
                    <h1 className='bg-dark p-2 text-white text-center'>About Us</h1>
                    <p className='text-justify mt-2'>
                        <i>Welcome to <b>SHOP ON</b>!

                        At <b>SHOP ON</b>, we're passionate about bringing you the best products and shopping experience. Founded in 2024, we've dedicated ourselves to curating a wide range of high-quality products that cater to your every need.

                        Our mission is simple: to make online shopping enjoyable, convenient, and reliable for our valued customers. Whether you're looking for the latest fashion trends, tech gadgets, home essentials, or unique gifts, we've got you covered.

                        What sets us apart is our commitment to excellence in customer service. Our team is here to assist you every step of the way, from browsing our extensive collection to ensuring your orders are delivered promptly and securely.

                        Thank you for choosing <b>SHOP ON</b>. We look forward to serving you and making your shopping experience exceptional!</i>
                    </p>
                </div>
            </div>
        </Layout>
    )
}

export default About