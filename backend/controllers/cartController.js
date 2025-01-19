import Cart from '../models/cart.model.js';

// Create a new cart
export const createCart = async (req, res) => {
    try {
        const cart = new Cart({
            items: [],
            status: 'active'
        });
        await cart.save();
        res.status(201).json(cart);
    } catch (error) {
        error(res, error);
    }
};

// Add item to cart
export const addItemToCart = async (req, res) => {
    try {
        const { cartId } = req.params;
        const { productId, quantity } = req.body;

        const cart = await Cart.findById(cartId);
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Check if product already exists in cart
        const existingItem = cart.items.find(item => item.product.toString() === productId);
        if (existingItem) {
            existingItem.quantity += quantity || 1;
        } else {
            cart.items.push({ product: productId, quantity: quantity || 1 });
        }

        await cart.save();
        res.json(cart);
    } catch (error) {
        error(res, error);
    }
};

// Remove item from cart
export const removeItemFromCart = async (req, res) => {
    try {
        const { cartId, productId } = req.params;

        const cart = await Cart.findById(cartId);
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        cart.items = cart.items.filter(item => item.product.toString() !== productId);
        await cart.save();
        res.json(cart);
    } catch (error) {
        error(res, error);
    }
};

// Update item quantity
export const updateItemQuantity = async (req, res) => {
    try {
        const { cartId, productId } = req.params;
        const { quantity } = req.body;

        const cart = await Cart.findById(cartId);
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const item = cart.items.find(item => item.product.toString() === productId);
        if (!item) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        item.quantity = quantity;
        await cart.save();
        res.json(cart);
    } catch (error) {
        error(res, error);
    }
};

// Get cart by ID
export const getCart = async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.cartId)
            .populate('items.product');
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.json(cart);
    } catch (error) {
        error(res, error);
    }
};

// Update cart status
export const updateCartStatus = async (req, res) => {
    try {
        const { cartId } = req.params;
        const { status } = req.body;

        const cart = await Cart.findByIdAndUpdate(
            cartId,
            { status },
            { new: true }
        );
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.json(cart);
    } catch (error) {
        error(res, error);
    }
};

// Clear cart
export const clearCart = async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.cartId);
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        cart.items = [];
        await cart.save();
        res.json(cart);
    } catch (error) {
        error(res, error);
    }
};