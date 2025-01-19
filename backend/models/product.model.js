import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
    data: {
        type: Buffer,
        required: true
    },
    contentType: {
        type: String,
        required: true,
        enum: ['image/jpeg', 'image/png', 'image/webp']
    },
    filename: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true,
        max: 5 * 1024 * 1024 // 5MB max file size
    }
});

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    description: {
        type: String,
        required: true
    },
    images: {
        type: [imageSchema],
        validate: {
            validator: function(v) {
                return v.length > 0 && v.length <= 5; // 1-5 images allowed
            },
            message: 'Product must have between 1 and 5 images'
        }
    },
    category: {
        type: String,
        required: true
    },
    discount: {
        type: Number,
        default: 0,
        min: 0,
        max: 100,
        validate: {
            validator: function(v) {
                return v >= 0 && v <= 100;
            },
            message: 'Discount must be a percentage between 0 and 100'
        }
    }

}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

export default Product;