import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { QuestionMarkCircleIcon } from '@heroicons/react/20/solid';
import CartItem from '../components/CartItem';
import { clearCart } from '../store/slices/cartSlice';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';


const Cart = () => {
    const dispatch = useDispatch();
    const { items } = useSelector(state => state.cart);
    
    const subtotal = items.reduce((total, item) => {
        const discountedPrice = (item.price * (100 - item.discount)) / 100;
        return total + (discountedPrice * item.quantity);
    }, 0);
    
    const shipping = subtotal > 100 ? 0 : 5;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    
    const navigate = useNavigate();

    const handleCheckout = () => {
        navigate('/checkout');
    };

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:max-w-7xl lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Your cart is empty</h1>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Shopping Cart</h1>
                <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
                    <section className="lg:col-span-7">
                        <ul className="divide-y divide-gray-200 border-b border-t border-gray-200">
                            {items.map(item => (
                                <CartItem key={item._id} item={item} />
                            ))}
                        </ul>
                    </section>

                    {/* Order summary */}
                    <section className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
                        <h2 className="text-lg font-medium text-gray-900">Order summary</h2>

                        <dl className="mt-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <dt className="text-sm text-gray-600">Subtotal</dt>
                                <dd className="text-sm font-medium text-gray-900">${subtotal.toFixed(2)}</dd>
                            </div>
                            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                <dt className="flex items-center text-sm text-gray-600">
                                    <span>Shipping estimate</span>
                                </dt>
                                <dd className="text-sm font-medium text-gray-900">${shipping.toFixed(2)}</dd>
                            </div>
                            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                <dt className="flex text-sm text-gray-600">
                                    <span>Tax estimate</span>
                                </dt>
                                <dd className="text-sm font-medium text-gray-900">${tax.toFixed(2)}</dd>
                            </div>
                            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                <dt className="text-base font-medium text-gray-900">Order total</dt>
                                <dd className="text-base font-medium text-gray-900">${total.toFixed(2)}</dd>
                            </div>
                        </dl>

                        <div className="mt-6">
                            <button
                                type="button"
                                onClick={handleCheckout}
                                className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Checkout
                            </button>
                        </div>
                    </section>
                </form>
            </div>
        </div>
    );
};

export default Cart;