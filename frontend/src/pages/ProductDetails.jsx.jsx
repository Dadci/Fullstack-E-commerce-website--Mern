import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductById } from '../store/slices/productSlice';
import {
    CheckIcon,
    HomeIcon,
    ChevronRightIcon,
    ChevronLeftIcon,
    ShoppingCartIcon,
    MinusIcon,
    PlusIcon
} from '@heroicons/react/24/outline';
import Navbar from '../components/Navbar';
import { addToCart } from '../store/slices/cartSlice';

const ProductDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { currentProduct: product, status } = useSelector(state => state.products);
    const [quantity, setQuantity] = useState(1);
    const [activeImage, setActiveImage] = useState(0);

    const handleAddToCart = () => {
        dispatch(addToCart({
            _id: product._id,
            name: product.name,
            price: product.price,
            images: product.images,
            discount: product.discount,
            quantity
        }));
    };

    useEffect(() => {
        if (id) {
            dispatch(getProductById(id));
        }
    }, [dispatch, id]);

    const nextImage = () => {
        setActiveImage((prev) => (prev + 1) % product.images.length);
    };

    const prevImage = () => {
        setActiveImage((prev) => (prev - 1 + product.images.length) % product.images.length);
    };

    if (status === 'loading') {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (!product) {
        return <div className="flex justify-center items-center h-screen">Product not found</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            {/* Breadcrumbs - keep existing code */}
            <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
                <ol className="flex items-center space-x-4">
                    <li className="flex items-center">
                        <Link
                            to="/"
                            className="text-gray-400 hover:text-gray-500 transition-colors"
                        >
                            <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                            <span className="sr-only">Home</span>
                        </Link>
                    </li>
                    <li className="flex items-center">
                        <ChevronRightIcon
                            className="h-5 w-5 flex-shrink-0 text-gray-400"
                            aria-hidden="true"
                        />
                        <Link
                            to={`/category/${product.category}`}
                            className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            {product.category}
                        </Link>
                    </li>
                    <li className="flex items-center">
                        <ChevronRightIcon
                            className="h-5 w-5 flex-shrink-0 text-gray-400"
                            aria-hidden="true"
                        />
                        <span className="ml-4 text-sm font-medium text-gray-700 truncate max-w-[200px]">
                            {product.name}
                        </span>
                    </li>
                </ol>
            </nav>

            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
                    {/* Image Gallery */}
                    <div className="relative">
                        <div className="aspect-square overflow-hidden rounded-2xl bg-gray-100 border ">
                            <img
                                src={`data:${product.images[activeImage]?.contentType};base64,${product.images[activeImage]?.data}`}
                                alt={product.name}
                                className="h-full w-full object-cover object-center transition-opacity duration-500"
                            />
                            {product.images.length > 1 && (
                                <>
                                    <button
                                        onClick={prevImage}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-lg hover:bg-white transition-all"
                                    >
                                        <ChevronLeftIcon className="h-6 w-6" />
                                    </button>
                                    <button
                                        onClick={nextImage}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-lg hover:bg-white transition-all"
                                    >
                                        <ChevronRightIcon className="h-6 w-6" />
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Thumbnails */}
                        <div className="mt-4 grid grid-cols-6 gap-2">
                            {product.images.map((image, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveImage(idx)}
                                    className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-all ${activeImage === idx ? 'border-indigo-500 ring-2 ring-indigo-500/50' : 'border-transparent'
                                        }`}
                                >
                                    <img
                                        src={`data:${image.contentType};base64,${image.data}`}
                                        alt={`${product.name} ${idx + 1}`}
                                        className="h-full w-full object-cover object-center"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                        <div className="lg:sticky lg:top-20">
                            <div className="flex items-center justify-between">
                                <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                                    {product.category}
                                </span>
                                {product.discount > 0 && (
                                    <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-800">
                                        -{product.discount}%
                                    </span>
                                )}
                            </div>

                            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900">{product.name}</h1>

                            <div className="mt-6">
                                <div className="flex items-baseline">
                                    <p className="text-4xl font-bold tracking-tight text-gray-900">
                                        ${((product.price * (100 - product.discount)) / 100).toFixed(2)}
                                    </p>
                                    {product.discount > 0 && (
                                        <p className="ml-3 text-lg text-gray-500 line-through">
                                            ${product.price?.toFixed(2)}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="mt-6">
                                <p className="text-base text-gray-500">{product.description}</p>
                            </div>

                            <div className="mt-8">
                                <div className="flex items-center">
                                    <CheckIcon className="h-5 w-5 flex-shrink-0 text-green-500" />
                                    <p className="ml-2 text-sm text-gray-500">In stock and ready to ship</p>
                                </div>
                            </div>

                            {/* Quantity Selector */}
                            <div className="mt-8">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-gray-700">Quantity</span>
                                    <div className="flex items-center gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="rounded-full bg-gray-100 p-2 hover:bg-gray-200 transition-colors"
                                        >
                                            <MinusIcon className="h-4 w-4" />
                                        </button>
                                        <span className="w-8 text-center">{quantity}</span>
                                        <button
                                            type="button"
                                            onClick={() => setQuantity(quantity + 1)}
                                            className="rounded-full bg-gray-100 p-2 hover:bg-gray-200 transition-colors"
                                        >
                                            <PlusIcon className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Add to Cart Button */}
                            <button
                                type="button"
                                className="mt-8 flex w-full items-center justify-center rounded-xl bg-indigo-600 px-8 py-4 text-base font-medium text-white shadow-lg transition-all hover:bg-indigo-700 hover:shadow-indigo-500/30 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                onClick={handleAddToCart}
                            >
                                <ShoppingCartIcon className="mr-2 h-5 w-5" />
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;