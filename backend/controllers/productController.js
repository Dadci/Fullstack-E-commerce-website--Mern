import Product from "../models/product.model.js";

const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        // Convert Buffer to Base64 for frontend display
        const productsWithBase64Images = products.map(product => ({
            ...product.toObject(),
            images: product.images.map(img => ({
                ...img,
                data: img.data.toString('base64')
            }))
        }));
        res.json(productsWithBase64Images);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({ message: 'Server Error' });
    }
}

const createProduct = async (req, res) => {
    try {
        const { name, price, description, category, discount } = req.body;
        const images = req.files.map(file => ({
            data: file.buffer,
            contentType: file.mimetype,
            filename: file.originalname,
            size: file.size
        }));

        const product = new Product({
            name,
            price,
            description,
            images,
            category,
            discount: discount || 0
        });

        await product.save();
        res.status(201).json(product);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({ message: 'Server Error' });
    }
};

const updateProduct = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ message: 'Product ID is required' });
        }

        const { name, price, description, category, discount } = req.body;
        const product = await Product.findById(id);

        if (product) {
            product.name = name;
            product.price = price;
            product.description = description;
            product.category = category;
            product.discount = discount || product.discount;

            if (req.files && req.files.length > 0) {
                product.images = req.files.map(file => ({
                    data: file.buffer,
                    contentType: file.mimetype,
                    filename: file.originalname,
                    size: file.size
                }));
            }

            const updatedProduct = await product.save();
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({ message: 'Server Error' });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            await Product.deleteOne({ _id: req.params.id });
            res.json({ message: 'Product removed' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({ message: 'Server Error' });
    }
}

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            const productWithBase64Images = {
                ...product.toObject(),
                images: product.images.map(img => ({
                    ...img,
                    data: img.data.toString('base64')
                }))
            };
            res.json(productWithBase64Images);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

export { getProducts, createProduct, updateProduct, deleteProduct, getProductById };



