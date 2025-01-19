import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateProduct, fetchProducts } from '../store/slices/productSlice';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [image, setImage] = useState('')
    const [description, setDescription] = useState('')

    // Get product from Redux store
    const { items } = useSelector(state => state.products);

    useEffect(() => {
        const product = items.find(p => p._id === id);
        if (product) {
            setName(product.name);
            setPrice(product.price);
            setCategory(product.category);
            setImage(product.image);
            setDescription(product.description);
        }
    }, [id, items]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedProduct = {
            _id: id,
            name,
            price: Number(price),
            category,
            image,
            description
        };

        try {
            await dispatch(updateProduct(updatedProduct)).unwrap();

            toast.success('Product updated successfully');
            navigate('/'); // Navigate back to product List
            dispatch(fetchProducts());
        } catch (err) {
            console.error('Failed to update product:', err);
            toast.error('Failed to update product');
        }
    };

    return (
        <div>
            <h1 className='text-3xl font-bold text-center m-12 text-teal-600'>Edit Product</h1>
            <div className='flex justify-center w-[500px] mx-auto border border-gray-200 p-6 bg-slate-50 rounded-lg'>
                <form action="put" className='flex flex-col gap-4 w-full'>
                    {/* Same form fields as CreateProduct */}
                    <label htmlFor="name" className='font-semibold text-gray-700'>Product name:</label>
                    <input
                        name='name'
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className='p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500'
                    />

                    <label htmlFor="price" className='font-semibold text-gray-700'>Price:</label>
                    <input
                        name='price'
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className='p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500'
                    />

                    <label htmlFor="category" className='font-semibold text-gray-700'>Category:</label>
                    <input
                        name='category'
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className='p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500'
                    />

                    <label htmlFor="image" className='font-semibold text-gray-700'>Image:</label>
                    <input
                        name='image'
                        type="text"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        className='p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500'
                    />

                    <label htmlFor="description" className='font-semibold text-gray-700'>Description:</label>
                    <textarea
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        cols="30"
                        rows="4"
                        className='p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500'
                    ></textarea>

                    <button
                        type='submit'
                        className='bg-teal-600 text-white mt-3 p-2.5 text-sm font-medium rounded-md transition hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500'
                        onClick={handleSubmit}
                    >
                        Update Product
                    </button>
                </form>
            </div>
        </div>
    )
}

export default EditProduct;