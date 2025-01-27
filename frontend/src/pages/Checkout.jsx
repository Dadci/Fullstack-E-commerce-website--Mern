import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../store/slices/orderSlice';
import { clearCart } from '../store/slices/cartSlice';
import Navbar from '../components/Navbar';

const Checkout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { items } = useSelector(state => state.cart);
    const [formData, setFormData] = useState({
        email: '',
        address: '',
        city: '',
        state: '',
        postalCode: ''
    });

    const subtotal = items.reduce((total, item) => {
        const discountedPrice = (item.price * (100 - item.discount)) / 100;
        return total + (discountedPrice * item.quantity);
    }, 0);
    
    const shipping = subtotal > 100 ? 0 : 5;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const orderData = {
            items: items.map(item => ({
                product: item._id,
                quantity: item.quantity,
                price: (item.price * (100 - item.discount)) / 100
            })),
            totalAmount: total,
            shippingAddress: {
                street: formData.address,
                city: formData.city,
                state: formData.state,
                postalCode: formData.postalCode
            },
            paymentMethod: 'cod'
        };

        try {
            await dispatch(createOrder(orderData)).unwrap();
            dispatch(clearCart());
            alert('Order placed successfully!');
        } catch (error) {
            console.error('Failed to create order:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            
            <main className="mx-auto max-w-7xl px-4 pt-16 pb-24 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:max-w-none">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Checkout</h1>
                    
                    <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
                        {/* Shipping Form */}
                        <section className="lg:col-span-7">
                            <div className="bg-white px-6 py-8 shadow-lg rounded-lg">
                                <h2 className="text-lg font-medium text-gray-900 mb-6">Shipping Information</h2>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                                        <div className="sm:col-span-2">
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                                Email address
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                required
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            />
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                                                Street address
                                            </label>
                                            <input
                                                type="text"
                                                name="address"
                                                id="address"
                                                required
                                                value={formData.address}
                                                onChange={handleChange}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                                                City
                                            </label>
                                            <input
                                                type="text"
                                                name="city"
                                                id="city"
                                                required
                                                value={formData.city}
                                                onChange={handleChange}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                                                State
                                            </label>
                                            <input
                                                type="text"
                                                name="state"
                                                id="state"
                                                required
                                                value={formData.state}
                                                onChange={handleChange}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
                                                Postal code
                                            </label>
                                            <input
                                                type="text"
                                                name="postalCode"
                                                id="postalCode"
                                                required
                                                value={formData.postalCode}
                                                onChange={handleChange}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </section>

                        {/* Order Summary */}
                        <section className="mt-16 lg:mt-0 lg:col-span-5">
                            <div className="bg-white px-6 py-8 shadow-lg rounded-lg">
                                <h2 className="text-lg font-medium text-gray-900 mb-6">Order summary</h2>
                                <div className="flow-root">
                                    <ul className="-my-4 divide-y divide-gray-200">
                                        {items.map((item) => (
                                            <li key={item._id} className="flex items-center py-4">
                                                <img
                                                    src={`data:${item.image?.contentType};base64,${item.image?.data}`}
                                                    alt={item.name}
                                                    className="h-16 w-16 flex-none rounded-md object-cover object-center"
                                                />
                                                <div className="ml-4 flex flex-1 flex-col">
                                                    <div className="flex justify-between">
                                                        <h3 className="text-sm text-gray-900">{item.name}</h3>
                                                        <p className="text-sm font-medium text-gray-900">
                                                            ${((item.price * (100 - item.discount)) / 100 * item.quantity).toFixed(2)}
                                                        </p>
                                                    </div>
                                                    <p className="mt-1 text-sm text-gray-500">Qty {item.quantity}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <dl className="mt-6 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <dt className="text-sm text-gray-600">Subtotal</dt>
                                        <dd className="text-sm font-medium text-gray-900">${subtotal.toFixed(2)}</dd>
                                    </div>
                                    <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                        <dt className="text-sm text-gray-600">Shipping</dt>
                                        <dd className="text-sm font-medium text-gray-900">${shipping.toFixed(2)}</dd>
                                    </div>
                                    <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                        <dt className="text-sm text-gray-600">Tax</dt>
                                        <dd className="text-sm font-medium text-gray-900">${tax.toFixed(2)}</dd>
                                    </div>
                                    <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                        <dt className="text-base font-medium text-gray-900">Order total</dt>
                                        <dd className="text-base font-medium text-gray-900">${total.toFixed(2)}</dd>
                                    </div>
                                </dl>

                                <div className="mt-6">
                                    <button
                                        type="submit"
                                        onClick={handleSubmit}
                                        className="w-full rounded-md bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        Place Order (Cash on Delivery)
                                    </button>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Checkout;