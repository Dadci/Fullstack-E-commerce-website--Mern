import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, deleteProduct } from '../store/slices/productSlice';
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ProductCard = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { items, status, error } = useSelector(state => state.products);

    const handleDelete = async (productId) => {
        try {
            await dispatch(deleteProduct(productId)).unwrap();
            dispatch(fetchProducts());
            toast.success('Product deleted successfully');
        } catch (err) {
            console.error('Failed to delete product:', err);
        }
    }






    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProducts());
        }
    }, [status, dispatch]);

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            {items.map(product => (
                <div className="group relative flex flex-col bg-white border rounded-lg shadow-sm overflow-hidden" key={product._id}>
                    {/* Image Container */}
                    <div className="aspect-w-4 aspect-h-3 bg-gray-200 group-hover:opacity-75">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover object-center"
                        />
                    </div>

                    {/* Content Container */}
                    <div className="flex flex-col flex-1 p-4">
                        {/* Top Row - Category & Price */}
                        <div className="flex items-center justify-between mb-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800">
                                {product.category}
                            </span>
                            <span className="text-lg font-bold text-gray-900">
                                ${product.price}
                            </span>
                        </div>

                        {/* Product Name */}
                        <h3 className="text-sm font-medium text-gray-900 group-hover:text-indigo-600 mb-1">
                            {product.name}
                        </h3>

                        {/* Description */}
                        <p className="mt-1 text-sm text-gray-500 line-clamp-2 flex-grow">
                            {product.description}
                        </p>

                        {/* Action Buttons */}
                        <div className="mt-4 flex items-center gap-2">
                            <button
                                type="button"
                                className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                onClick={() => navigate(`/edit/${product._id}`)}
                            >
                                Edit
                            </button>
                            <button
                                type="button"
                                className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                onClick={() => handleDelete(product._id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default ProductCard;