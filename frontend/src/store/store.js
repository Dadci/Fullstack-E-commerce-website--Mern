import { configureStore } from '@reduxjs/toolkit';
import ProductReducer from './slices/productSlice';
import UserReducer from './slices/userSlice';
import cartReducer from './slices/cartSlice';
import orderReducer from './slices/orderSlice';

const store = configureStore({
    reducer: {
        products: ProductReducer,
        user: UserReducer,
        cart: cartReducer,
        orders: orderReducer

    }
});

export default store;