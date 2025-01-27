import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../../store/slices/orderSlice';
import { Link } from 'react-router-dom';

const OrderManagement = () => {
    const dispatch = useDispatch();
    const { orders, status, error } = useSelector((state) => state.orders);

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    if (status === 'loading') {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (status === 'failed') {
        return <div className="text-red-500 text-center">{error}</div>;
    }

    if (!orders?.length) {
        return <div className="text-center py-10">No orders found</div>;
    }

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-xl font-semibold text-gray-900">Orders</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all orders including their status, total amount, and delivery details.
                    </p>
                </div>
            </div>
            <div className="mt-8 flex flex-col">
                <div className="-mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Order ID</th>
                                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Customer</th>
                                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Address</th>
                                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Items</th>
                                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Total</th>
                                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Date</th>
                                        <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {orders.map((order) => (
                                        <tr key={order._id}>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                                                #{order._id.slice(-6)}
                                            </td>
                                            <td className="px-3 py-4 text-sm text-gray-500">
                                                <div>{order.customer?.name}</div>
                                                <div className="text-gray-400">{order.customer?.email}</div>
                                            </td>
                                            <td className="px-3 py-4 text-sm text-gray-500">
                                                <div>{order.shippingAddress?.street}</div>
                                                <div>{`${order.shippingAddress?.city}, ${order.shippingAddress?.state} ${order.shippingAddress?.postalCode}`}</div>
                                            </td>
                                            <td className="px-3 py-4 text-sm text-gray-500">
                                                {order.items.length} items
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900">
                                                ${order.totalAmount.toFixed(2)}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4">
                                                <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold 
                                                    ${order.status === 'pending' && 'bg-yellow-100 text-yellow-800'}
                                                    ${order.status === 'processing' && 'bg-blue-100 text-blue-800'}
                                                    ${order.status === 'shipped' && 'bg-indigo-100 text-indigo-800'}
                                                    ${order.status === 'delivered' && 'bg-green-100 text-green-800'}
                                                    ${order.status === 'cancelled' && 'bg-red-100 text-red-800'}
                                                `}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {new Date(order.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                <Link
                                                    to={`/admin/orders/${order._id}`}
                                                    className="text-indigo-600 hover:text-indigo-900"
                                                >
                                                    View details
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderManagement;