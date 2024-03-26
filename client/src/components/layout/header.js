import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { useAuth } from '../../context/auth'
import toast from 'react-hot-toast'
import SearchInput from '../Form/SearchInput'
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import "../../styles/badge.css";

const Header = () => {
    const [auth, setAuth] = useAuth();
    const { cart } = useCart();
    const categories = useCategory();
    const handleLogout = () => {
        setAuth({
            ...auth, user: null, token: ''
        })
        localStorage.removeItem('auth');
        toast.success("Logout Successfully");
    }
    const Badge = ({ count, showZero = false, offset = [0, 0] }) => (
        <span className="badge" style={{ display: count || showZero ? 'inline-block' : 'none', marginLeft: offset[0], marginTop: offset[1] }}>
            {count}
        </span>
    );
    return (
        <>
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <Link to="/" class="navbar-brand"> <AiOutlineShoppingCart /> Hidden brand</Link>
                        <ul class="navbar-nav ms-auto mb-2 mb-lg-0" style={{ textDecoration: "none" }}>
                            <SearchInput />
                            <li class="nav-item">
                                <NavLink to="/" class="nav-link active ml-2" aria-current="page" style={{ textDecoration: "none", color: "black" }}>Home</NavLink>
                            </li>
                            <li className="nav-item dropdown">
                                <Link
                                    className="nav-link dropdown-toggle"
                                    to={"/categories"}
                                    data-bs-toggle="dropdown"
                                >
                                    Categories
                                </Link>
                                <ul className="dropdown-menu">
                                    <li>
                                        <Link className="dropdown-item" to={"/categories"}>
                                            All Categories
                                        </Link>
                                    </li>
                                    {categories?.map((c) => (
                                        <li>
                                            <Link
                                                className="dropdown-item"
                                                to={`/category/${c.slug}`}
                                            >
                                                {c.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                            {!auth.user ? (
                                <>
                                    <li class="nav-item">
                                        <NavLink to="/register" class="nav-link" style={{ textDecoration: "none", color: "black" }}>Register</NavLink>
                                    </li>
                                    <li class="nav-item">
                                        <NavLink to="/login" class="nav-link" style={{ textDecoration: "none", color: "black" }}>Login</NavLink>
                                    </li>
                                    <li class="nav-item">
                                        <NavLink to="/cart" class="nav-link" style={{ textDecoration: "none", color: "black" }}>Cart (0)</NavLink>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item dropdown">
                                        <NavLink className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            {auth?.user?.name}
                                        </NavLink>
                                        <ul className="dropdown-menu">
                                            <li><NavLink to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`} className="dropdown-item">Dashboard</NavLink></li>
                                            <li><NavLink onClick={handleLogout} to="/login" className="dropdown-item" href="#">Logout</NavLink></li>
                                        </ul>
                                    </li>
                                </>
                            )}
                            <li className="nav-item">
                                <NavLink to="/cart" className="nav-link">
                                    Cart
                                    <Badge count={cart?.length} showZero offset={[10, -5]} />
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                </div>
            </nav>
        </>
    )
}

export default Header;