import { createSlice } from '@reduxjs/toolkit';

const saveToStorage = (items) => {
    try {
        // Only store essential data
        const minimalCart = items.map(item => ({
            _id: item._id,
            name: item.name,
            price: item.price,
            discount: item.discount,
            quantity: item.quantity,
            // Store minimal image data
            image: item.image ? {
                contentType: item.image.contentType,
                data: item.image.data.substring(0, 100) // Store thumbnail version
            } : null
        }));
        
        localStorage.setItem('cart', JSON.stringify(minimalCart));
    } catch (error) {
        console.warn('Failed to save cart to localStorage:', error);
    }
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: (() => {
            try {
                return JSON.parse(localStorage.getItem('cart')) || [];
            } catch {
                return [];
            }
        })(),
        total: 0
    },
    reducers: {
        addToCart: (state, action) => {
            const { _id, name, price, images, discount, quantity = 1 } = action.payload;
            const existingItem = state.items.find(item => item._id === _id);

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                state.items.push({
                    _id,
                    name,
                    price,
                    image: images[0],
                    discount,
                    quantity
                });
            }
            
            // Limit cart size
            if (state.items.length > 20) {
                state.items = state.items.slice(-20);
            }
            
            saveToStorage(state.items);
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(item => item._id !== action.payload);
            saveToStorage(state.items);
        },
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const item = state.items.find(item => item._id === id);
            if (item) {
                item.quantity = quantity;
            }
            saveToStorage(state.items);
        },
        clearCart: (state) => {
            state.items = [];
            localStorage.removeItem('cart');
        }
    }
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;