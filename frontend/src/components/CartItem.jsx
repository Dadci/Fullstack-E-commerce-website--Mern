import React from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../store/slices/cartSlice';
import { XMarkIcon, CheckIcon } from '@heroicons/react/20/solid';

const CartItem = ({ item }) => {
    const dispatch = useDispatch();

    const handleQuantityChange = (e) => {
        dispatch(updateQuantity({ id: item._id, quantity: Number(e.target.value) }));
    };

    const handleRemove = () => {
        dispatch(removeFromCart(item._id));
    };

    return (
        <li className="flex py-6 sm:py-10">
            <div className="flex-shrink-0">
                <img
                    src={`data:${item.image?.contentType};base64,${item.image?.data}`}
                    alt={item.name}
                    className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                />
            </div>

            <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                    <div>
                        <div className="flex justify-between">
                            <h3 className="text-sm font-medium text-gray-700">{item.name}</h3>
                        </div>
                        <p className="mt-1 text-sm font-medium text-gray-900">
                            ${((item.price * (100 - item.discount)) / 100).toFixed(2)}
                        </p>
                        {item.discount > 0 && (
                            <p className="mt-1 text-sm text-gray-500 line-through">
                                ${item.price.toFixed(2)}
                            </p>
                        )}
                    </div>

                    <div className="mt-4 sm:mt-0 sm:pr-9">
                        <select
                            value={item.quantity}
                            onChange={handleQuantityChange}
                            className="max-w-full rounded-md border border-gray-300 py-1.5 text-base leading-5 text-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        >
                            {[1,2,3,4,5,6,7,8,9,10].map(num => (
                                <option key={num} value={num}>{num}</option>
                            ))}
                        </select>

                        <div className="absolute right-0 top-0">
                            <button 
                                type="button" 
                                onClick={handleRemove}
                                className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                            >
                                <span className="sr-only">Remove</span>
                                <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
};

export default CartItem;