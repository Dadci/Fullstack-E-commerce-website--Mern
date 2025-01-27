import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from '../store/slices/productSlice';
import { Link } from 'react-router-dom';
import { addToCart } from '../store/slices/cartSlice';

// Separate component for Product Card to improve readability
const ProductCard = ({ product }) => {
    const dispatch = useDispatch();

    const handleAddToCart = (e, product) => {
        e.preventDefault();
        dispatch(addToCart({
            _id: product._id,
            name: product.name,
            price: product.price,
            images: product.images,
            discount: product.discount,
            quantity: 1
        }));
    };

    return (
        <Link to={`/product/${product._id}`} className="block">
            <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                {/* Image */}
                <div className="relative h-64 overflow-hidden rounded-t-lg">
                    <img 
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
                        src={`data:${product.images[0]?.contentType};base64,${product.images[0]?.data}`}
                        alt={product.name} 
                    />
                    {product.discount > 0 && (
                        <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                            -{product.discount}%
                        </span>
                    )}
                </div>
        
                {/* Content */}
                <div className="p-4">
                    <span className="text-xs font-medium text-gray-500">{product.category}</span>
                    <h3 className="mt-1 text-lg font-medium text-gray-900 hover:text-blue-600">{product.name}</h3>
                    
                    <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-baseline gap-2">
                            <span className="text-lg font-bold text-gray-900">
                                ${((product.price * (100 - product.discount)) / 100).toFixed(2)}
                            </span>
                            {product.discount > 0 && (
                                <span className="text-sm text-gray-400 line-through">
                                    ${product.price?.toFixed(2)}
                                </span>
                            )}
                        </div>
                        <button 
                            className="text-white bg-blue-500 p-2 rounded-full hover:bg-blue-600"
                            onClick={(e) => handleAddToCart(e, product)}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                      d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
};

// Loading and Error components
const Loading = () => (
    <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
);

const Error = ({ message }) => (
    <div className="text-red-500 text-center h-64 flex items-center justify-center">
        <p>Error: {message}</p>
    </div>
);

function ProductList() {
    const dispatch = useDispatch();
    const { items: products, status, error } = useSelector((state) => state.products);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProducts());
        }
    }, [status, dispatch]);

    if (status === 'loading') return <Loading />;
    if (status === 'failed') return <Error message={error} />;

    return (
        <div className="bg-slate-50">
            <div className="mx-auto  px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
                <div className="md:flex md:items-center md:justify-between">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Trending products</h2>
                    <Link to="/products" className="hidden text-sm font-medium text-blue-600 hover:text-blue-800 md:block transition-colors duration-200">
                        Explore the collection
                        <span aria-hidden="true"> &rarr;</span>
                    </Link>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>

                <div className="mt-8 text-sm md:hidden">
                    <Link to="/products" className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200">
                        Shop the collection
                        <span aria-hidden="true"> &rarr;</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ProductList;