import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createProduct, fetchProducts } from '../../store/slices/productSlice';
import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/solid';

const AddProductModal = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        category: '',
        discount: '0',
        images: []
    });
    const [previews, setPreviews] = useState([]);
    const [isUploading, setIsUploading] = useState(false);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setFormData({ ...formData, images: files });
        
        // Generate previews
        const newPreviews = files.map(file => ({
            url: URL.createObjectURL(file),
            name: file.name
        }));
        setPreviews(newPreviews);
    };

    const removeImage = (index) => {
        const newImages = [...formData.images];
        newImages.splice(index, 1);
        setFormData({ ...formData, images: newImages });

        const newPreviews = [...previews];
        URL.revokeObjectURL(newPreviews[index].url);
        newPreviews.splice(index, 1);
        setPreviews(newPreviews);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsUploading(true);
        
        const productData = new FormData();
        Object.keys(formData).forEach(key => {
            if (key === 'images') {
                formData.images.forEach(image => {
                    productData.append('images', image);
                });
            } else {
                productData.append(key, formData[key]);
            }
        });

        try {
            await dispatch(createProduct(productData)).unwrap();
            onClose();
            dispatch(fetchProducts());
            

        } catch (error) {
            console.error('Upload failed:', error);
        } finally {
            setIsUploading(false);
        }
    };

    // Clean up previews on unmount
    React.useEffect(() => {
        return () => {
            previews.forEach(preview => URL.revokeObjectURL(preview.url));
        };
    }, []);

    return (
        <div className="fixed inset-0 bg-gray-600 backdrop-blur-sm bg-opacity-50 overflow-y-auto h-full w-full">
            <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold text-gray-900">Add New Product</h2>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            {/* Product Name */}
                            <div className="sm:col-span-4">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-900">
                                    Product Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="block w-full rounded-md px-3 py-1.5 text-gray-900 border border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Price */}
                            <div className="sm:col-span-2">
                                <label htmlFor="price" className="block text-sm font-medium text-gray-900">
                                    Price
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="number"
                                        name="price"
                                        id="price"
                                        min="0"
                                        step="0.01"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        className="block w-full rounded-md px-3 py-1.5 text-gray-900 border border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Description */}
                            <div className="col-span-full">
                                <label htmlFor="description" className="block text-sm font-medium text-gray-900">
                                    Description
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="description"
                                        name="description"
                                        rows={3}
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="block w-full rounded-md px-3 py-1.5 text-gray-900 border border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Category */}
                            <div className="sm:col-span-3">
                                <label htmlFor="category" className="block text-sm font-medium text-gray-900">
                                    Category
                                </label>
                                <div className="mt-2">
                                    <select
                                        id="category"
                                        name="category"
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="block w-full rounded-md px-3 py-1.5 text-gray-900 border border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                        required
                                    >
                                        <option value="">Select a category</option>
                                        <option value="Electronics">Electronics</option>
                                        <option value="Clothing">Clothing</option>
                                        <option value="Books">Books</option>
                                    </select>
                                </div>
                            </div>

                            {/* Discount */}
                            <div className="sm:col-span-2">
                                <label htmlFor="discount" className="block text-sm font-medium text-gray-900">
                                    Discount (%)
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="number"
                                        name="discount"
                                        id="discount"
                                        min="0"
                                        max="100"
                                        value={formData.discount}
                                        onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                                        className="block w-full rounded-md px-3 py-1.5 text-gray-900 border border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                    />
                                </div>
                            </div>

                            {/* Images */}
                            <div className="col-span-full">
                                <label htmlFor="images" className="block text-sm font-medium text-gray-900">
                                    Product Images
                                </label>
                                
                                {/* Preview Area */}
                                {previews.length > 0 && (
                                    <div className="mt-2 grid grid-cols-4 gap-4">
                                        {previews.map((preview, index) => (
                                            <div key={preview.url} className="relative group">
                                                <img
                                                    src={preview.url}
                                                    alt={`Preview ${index + 1}`}
                                                    className="h-24 w-24 object-cover rounded-lg"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeImage(index)}
                                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <XMarkIcon className="h-4 w-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Upload Area */}
                                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                    <div className="text-center">
                                        <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                            <label
                                                htmlFor="images"
                                                className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500"
                                            >
                                                <span>Upload files</span>
                                                <input
                                                    id="images"
                                                    name="images"
                                                    type="file"
                                                    multiple
                                                    accept="image/*"
                                                    className="sr-only"
                                                    onChange={handleImageChange}
                                                    required={previews.length === 0}
                                                />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs leading-5 text-gray-600">
                                            PNG, JPG, WEBP up to 5MB each
                                        </p>
                                        {isUploading && (
                                            <div className="mt-2 text-sm text-blue-600">
                                                Uploading...
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-sm font-semibold text-gray-900"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                        >
                            Save Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProductModal;