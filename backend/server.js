import express from "express";
import productRoute from "./routes/productRoute.js";
import userRoute from "./routes/userRoute.js";
import orderRoute from "./routes/orderRoute.js";
import cartRoute from "./routes/cartRoute.js";
import connectDB from "./config/db.js";
import dotenv from 'dotenv';
import cors from 'cors';
import seedAdmin from "./seedAdmin.js";




const app = express();
dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());

app.use('/api/products', productRoute);
app.use('/api/admins', userRoute);
app.use('/api/orders', orderRoute);
app.use('/api/carts', cartRoute);


// Define port
const port = process.env.PORT || 5000;

// Basic route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the MERN application.' });
});

// Start server
app.listen(port, async () => {
    await connectDB();
    await seedAdmin();
    console.log(`Server is running on port: ${port}`);
});

