import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    items: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: Number,
        price: Number
    }],
    customer: {
        name: String,
        email: String,
        phone: String
    },
    shippingAddress: {
        street: String,
        city: String,
        state: String,
        postalCode: String
    },
    totalAmount: Number,
    status: {
        type: String,
        enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    },
    paymentMethod: {
        type: String,
        enum: ['cod'],
        default: 'cod'
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'failed'],
        default: 'pending'
    }
}, { 
    timestamps: true 
});

export default mongoose.model('Order', orderSchema);