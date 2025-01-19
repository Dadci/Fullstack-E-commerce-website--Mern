import { configureStore } from '@reduxjs/toolkit';
import ProductReducer from './slices/productSlice';
import UserReducer from './slices/userSlice';

const store = configureStore({
    reducer: {
        products: ProductReducer,
        user: UserReducer
        
    }
});

export default store;