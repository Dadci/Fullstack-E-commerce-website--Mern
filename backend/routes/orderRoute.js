import express from 'express';
import {
createOrder,
getAllOrders,
getOrderById,
updateOrderStatus,
updatePaymentStatus,
cancelOrder
} from '../controllers/orderController.js';

const router = express.Router();

// Create new order
router.post('/', createOrder);

// Get all orders
router.get('/', getAllOrders);

// Get single order
router.get('/:id', getOrderById);

// Update order status
router.patch('/:id/status', updateOrderStatus);

// Update payment status
router.patch('/:id/payment', updatePaymentStatus);

// Cancel order
router.patch('/:id/cancel', cancelOrder);

export default router;