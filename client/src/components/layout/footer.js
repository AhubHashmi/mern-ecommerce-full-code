import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div className='footer'>
            <h1 className='text-center'>&copy; 2023, All Rights Reserved.</h1>
            <p className='text-center mt-3'>
                <Link to="/about">About</Link>|<Link to="/contact">Contact Us</Link>|<Link to="/policy">Policy</Link>
            </p>
        </div>
    )
}

export default Footer