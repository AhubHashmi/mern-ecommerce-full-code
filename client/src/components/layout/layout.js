import React from 'react'
import Header from './header'
import Footer from './footer'
import { Helmet } from "react-helmet";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = ({ children, title, description, keywords, author }) => {
    return (
        <div>
            <Helmet>
                <div>
                    <meta charSet="utf-8" />
                    <meta name="description" content={description} />
                    <meta name="keywords" content={keywords} />
                    <meta name="author" content={author} />
                </div>

                <title>{title}</title>
            </Helmet>
            <Header />
            <main style={{ minHeight: "78vh" }}>
                <ToastContainer />
                {children}</main>
            <Footer />
        </div>
    )
}

Layout.defaultProps = {
    title: "Shop Shop",
    description: "Ecommerce MERN Stack Project",
    keywords: "mern, react, ecommerce, 2023",
    author: "AxhxUXb",
};

export default Layout