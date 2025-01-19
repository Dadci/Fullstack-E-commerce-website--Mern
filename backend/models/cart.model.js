import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1
    }
});

const cartSchema = new mongoose.Schema({
    // sessionId: {
    //     type: String,
    //     required: true
    // },
    items: [cartItemSchema],
    totalAmount: {
        type: Number,
        required: true,
        default: 0
    },
    status: {
        type: String,
        required: true,
        enum: ['active', 'completed', 'abandoned'],
        default: 'active'
    }
}, { timestamps: true });

// Calculate total amount before saving
cartSchema.pre('save', async function(next) {
    let total = 0;
    for (const item of this.items) {
        const product = await mongoose.model('Product').findById(item.product);
        if (product) {
            const priceWithDiscount = product.price * (1 - product.discount / 100);
            total += priceWithDiscount * item.quantity;
        }
    }
    this.totalAmount = total;
    next();
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;