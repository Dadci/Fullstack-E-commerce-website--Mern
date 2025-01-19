import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { createProduct } from '../store/slices/productSlice';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'; 

const CreateProduct = () => {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        category: '',
        image: '',
        description: ''
    });

    const dispatch = useDispatch();
    const navigate = useNavigate(); // Add this

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newProduct = {
            ...formData,
            price: Number(formData.price)
        };
        
        try {
            await dispatch(createProduct(newProduct)).unwrap();
            // Reset form
            setFormData({
                name: '',
                price: '',
                category: '',
                image: '',
                description: ''
            });
            toast.success('Product added successfully');
            navigate('/');
        } catch (err) {
            console.error('Failed to create product:', err);
        }
    };

    return (
        <div>
            <h1 className='text-3xl font-bold text-center m-12 text-teal-600'>Add new product</h1>
            <div className='flex justify-center w-[500px] mx-auto border border-gray-200 p-6 bg-slate-50 rounded-lg '>
                <form action="post" className='flex flex-col gap-4 w-full'>
                    <label htmlFor="name" className='font-semibold text-gray-700'>Product name:</label>
                    <input
                        name='name'
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder='Apple watch'
                        className='p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500'
                    />

                    <label htmlFor="price" className='font-semibold text-gray-700'>Price:</label>
                    <input
                        name='price'
                        type="number"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder='10.00'
                        className='p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500'
                    />

                    <label htmlFor="category" className='font-semibold text-gray-700'>Category:</label>
                    <input
                        name='category'
                        type="text"
                        value={formData.category}
                        onChange={handleChange}
                        placeholder='Electronics'
                        className='p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500'
                    />

                    <label htmlFor="image" className='font-semibold text-gray-700'>Image:</label>
                    <input
                        name='image'
                        type="text"
                        value={formData.image}
                        onChange={handleChange}
                        placeholder='Image URL'
                        className='p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500'
                    />

                    <label htmlFor="description" className='font-semibold text-gray-700'>Description:</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        cols="30"
                        rows="4"
                        className='p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500'
                    ></textarea>

                    <button
                        type='submit'
                        className='bg-teal-600 text-white mt-3 p-2.5 text-sm font-medium rounded-md transition hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500' 
                        onClick={handleSubmit}
                    >
                        Add Product
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CreateProduct