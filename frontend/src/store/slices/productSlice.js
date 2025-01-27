import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunks
export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        const response = await axios.get('http://localhost:5500/api/products');
        return response.data;
    }
);

export const createProduct = createAsyncThunk(
    'products/createProduct',
    async (productData) => {
        const response = await axios.post('http://localhost:5500/api/products', productData);
        return response.data;
    }
);

export const updateProduct = createAsyncThunk(
    'products/updateProduct',
    async ({id, data}) => {
        const response = await axios.put(`http://localhost:5500/api/products/${id}`, data);
        return response.data;
    }
);

export const deleteProduct = createAsyncThunk(
    'products/deleteProduct',
    async (productId) => {
        await axios.delete(`http://localhost:5500/api/products/${productId}`);
        return productId;
    }
);

// Add new thunk
export const getProductById = createAsyncThunk(
    'products/getProductById',
    async (id) => {
        const response = await axios.get(`http://localhost:5500/api/products/${id}`);
        return response.data;
    }
);

const productSlice = createSlice({
    name: 'products',
    initialState: {
        items: [],
        currentProduct: null,
        status: 'idle',
        error: null
    },
    reducers: {
        resetStatus: (state) => {
            state.status = 'idle';
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch products cases
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            // Create product cases
            .addCase(createProduct.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items.push(action.payload);
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            // Update product cases
            .addCase(updateProduct.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const index = state.items.findIndex(item => item._id === action.payload._id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            // Delete product cases
            .addCase(deleteProduct.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = state.items.filter(item => item._id !== action.payload);
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            // Get product by id cases
            .addCase(getProductById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getProductById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.currentProduct = action.payload;
            })
            .addCase(getProductById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export const { resetStatus } = productSlice.actions;
export default productSlice.reducer;