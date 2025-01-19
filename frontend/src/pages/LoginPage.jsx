import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginAdmin, clearError } from '../store/slices/userSlice';

const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const admin  = useSelector((state) => state.admin);
    const loading = useSelector((state) => state.loading);
    const error = useSelector((state) => state.error);

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    useEffect(() => {
        // If admin is already logged in, redirect to home
        if (admin) {
            navigate('/');
        }
        // Clear any previous errors when component mounts
        dispatch(clearError());
    }, [admin, navigate, dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(loginAdmin(formData));
    };

    return (
        <section>
            <div className="grid gap-0 md:h-screen md:grid-cols-2">
                {/* Left side with form */}
                <div className="flex items-center justify-center px-5 py-16 md:px-10 md:py-20">
                    <div className="max-w-md text-center">
                        <h2 className="mb-8 text-3xl font-bold md:mb-12 md:text-5xl lg:mb-16">
                            Admin Login
                        </h2>
                        <div className="mx-auto mb-4 max-w-sm pb-4">
                            <form onSubmit={handleSubmit}>
                                <div className="relative">
                                    <img
                                        alt=""
                                        src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a9455fae6cf89_EnvelopeSimple.svg"
                                        className="absolute left-5 top-3 inline-block"
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="mb-4 block h-9 w-full rounded-md border border-solid border-black px-3 py-6 pl-14 text-sm text-black placeholder:text-black"
                                        placeholder="Email Address"
                                        required
                                    />
                                </div>
                                <div className="relative mb-4">
                                    <img
                                        alt=""
                                        src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a946794e6cf8a_Lock-2.svg"
                                        className="absolute left-5 top-3 inline-block"
                                    />
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="mb-4 block h-9 w-full rounded-md border border-solid border-black px-3 py-6 pl-14 text-sm text-black placeholder:text-black"
                                        placeholder="Password"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="inline-block w-full cursor-pointer items-center bg-black px-6 py-3 text-center font-semibold text-white"
                                    disabled={loading}
                                    onClick={handleSubmit}
                                >
                                    {loading ? 'Logging in...' : 'Login'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                {/* Right side with testimonial */}
                <div className="flex items-center justify-center bg-gray-100">
                    <div className="mx-auto max-w-md px-5 py-16 md:px-10 md:py-24 lg:py-32">
                        <div className="mb-5 flex h-14 w-14 flex-col items-center justify-center bg-white md:mb-6 lg:mb-8">
                            <img
                                src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a949eade6cf7d_Vector-2.svg"
                                alt=""
                                className="inline-block"
                            />
                        </div>
                        <p className="mb-8 text-sm sm:text-base md:mb-12 lg:mb-16 text-gray-500">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit ut
                            aliquam, purus sit amet luctus venenatis, lectus magna fringilla
                            urna, porttitor rhoncus dolor purus non enim.
                        </p>
                        <p className="text-sm font-bold sm:text-base">John Robert</p>
                        <p className="text-sm sm:text-sm text-gray-500">Senior Webflow Developer</p>
                    </div>
                </div>
            </div>

        </section>

    );
};

export default LoginPage;