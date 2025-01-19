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
                <div className="group relative block overflow-hidden  w-full" key={product._id}>

                    <img
                        src={product.image}
                        alt=""
                        className=" aspect-auto w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
                    />

                    <div className="relative border border-gray-200 bg-white p-6">

                        <span className="whitespace-nowrap bg-teal-500 px-3 py-1.5 text-xs font-medium text-white rounded"> {product.category} </span>

                        <h3 className="mt-4 text-lg font-medium text-gray-900">{product.name}</h3>

                        <p className="mt-1.5 text-sm text-gray-700 font-medium">${product.price}</p>
                        <p className="mt-1.5 text-sm text-gray-700">{product.description}</p>

                        <form className="mt-4 flex gap-4">
                            <button
                                type="button"
                                className="block w-full rounded bg-blue-500 text-white p-2.5 text-sm font-medium transition "
                                onClick={() => navigate(`/edit/${product._id}`)}
                            >
                                Edit
                            </button>
                            <button
                                type="button"
                                className="block w-full rounded bg-indigo-400 text-white p-2.5 text-sm font-medium transition "
                                onClick={() => handleDelete(product._id)}
                            >Delete
                            </button>
                        </form>
                    </div>
                </div>
            ))}
        </>
    );
};

export default ProductCard;