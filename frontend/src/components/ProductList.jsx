import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from '../store/slices/productSlice';
import { Link } from 'react-router-dom';

// Separate component for Product Card to improve readability
const ProductCard = ({ product }) => (
    <div className="group relative">
        <div className="h-56 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-72 xl:h-80">
            <img
                src={`data:${product.images[0]?.contentType};base64,${product.images[0]?.data}`}
                alt={product.name}
                className="h-full w-full object-cover object-center"
                loading="lazy" // Add lazy loading for better performance
            />
        </div>
        <h3 className="mt-4 text-sm text-gray-700">
            <Link to={`/product/${product._id}`}>
                <span className="absolute inset-0" />
                {product.name}
            </Link>
        </h3>
        <p className="mt-1 text-sm text-gray-500">{product.category}</p>
        <div className="mt-1 flex items-center justify-between"></div>
            <p className="text-sm font-medium pb-2 text-gray-900">
                {product.discount > 0 ? (
                    <>
                        ${((product.price * (100 - product.discount)) / 100).toFixed(2)}
                        <span className="text-gray-500 line-through ml-2">
                            ${product.price?.toFixed(2)}
                        </span>
                    </>
                ) : (
                    `$${product.price?.toFixed(2)}`
                )}
            </p>
            {product.discount > 0 && (
                <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded">
                    {product.discount}% OFF
                </span>
            )}
        </div>
    
);

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
        <div className="bg-white">
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