import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/userSlice';

const Navbar = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);

    return (
        <nav className="bg-white shadow">
            <div className="container mx-auto px-6 py-3">
                <div className="flex justify-between items-center">
                    <Link to="/" className="text-xl font-bold">Home</Link>
                    <div className="flex items-center gap-4">
                        {user ? (
                            <>
                                <Link to="/create" className="btn">Create Product</Link>
                                <button 
                                    onClick={() => dispatch(logout())}
                                    className="btn-secondary"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="btn">Login</Link>
                                <Link to="/register" className="btn">Register</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;