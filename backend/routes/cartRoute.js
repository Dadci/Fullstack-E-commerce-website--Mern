import express from 'express';
import {
    createCart,
    addItemToCart,
    removeItemFromCart,
    updateItemQuantity,
    getCart,
    updateCartStatus,
    clearCart
} from '../controllers/cartController.js';

const router = express.Router();

// Cart routes
router.post('/', createCart);
router.get('/:cartId', getCart);
router.post('/:cartId/items', addItemToCart);
router.delete('/:cartId/items/:productId', removeItemFromCart);
router.put('/:cartId/items/:productId', updateItemQuantity);
router.put('/:cartId/status', updateCartStatus);
router.delete('/:cartId', clearCart);

export default router;