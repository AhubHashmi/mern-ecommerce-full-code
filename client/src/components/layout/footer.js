import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div className='footer'>
            <h2 className='text-center'>&copy; 2023, All Rights Reserved.</h2>
            <p className='text-center mt-3'>
                <span className='footer-link'>
                    <Link to="/about">About Us</Link>
                </span>
                <span className='footer-link'>
                    <Link to="/contact">Contact Us</Link>
                </span>
                <span className='footer-link'>
                    <Link to="/policy">Policy</Link>
                </span>
            </p>
        </div>

    );
}

export default Footer