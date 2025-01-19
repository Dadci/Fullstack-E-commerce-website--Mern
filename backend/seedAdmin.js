import User from './models/user.model.js';
import dotenv from 'dotenv';

dotenv.config();

const seedAdmin = async () => {
    try {
        // Check if admin exists
        const adminExists = await User.findOne({ email: process.env.ADMIN_EMAIL });
        
        if (!adminExists) {
            await User.create({
                email: process.env.ADMIN_EMAIL,
                password: process.env.ADMIN_PASSWORD,
                isAdmin: true
            });
            console.log('Admin user seeded successfully');
        }
    } catch (error) {
        console.error('Error seeding admin:', error);
    }
};

export default seedAdmin;