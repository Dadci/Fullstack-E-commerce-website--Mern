import React from 'react';

const AdminDashboard = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            
            {/* Dashboard Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Stats Cards */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-gray-500 text-sm">Total Sales</h3>
                    <p className="text-2xl font-semibold mt-2">$24,567</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-gray-500 text-sm">Total Orders</h3>
                    <p className="text-2xl font-semibold mt-2">142</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-gray-500 text-sm">Total Products</h3>
                    <p className="text-2xl font-semibold mt-2">89</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-gray-500 text-sm">Total Customers</h3>
                    <p className="text-2xl font-semibold mt-2">256</p>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;