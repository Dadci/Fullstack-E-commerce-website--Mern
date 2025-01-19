import User from '../models/user.model.js';

// Admin login
 const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, isAdmin: true });
        
        if (!user) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        res.status(200).json({ 
            message: 'Admin login successful', 
            admin: { 
                id: user._id,
                email: user.email,
                isAdmin: user.isAdmin
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error during admin login', error: error.message });
    }
};

// Create admin (for initial setup)
 const createAdmin = async (req, res) => {
    try {
        const adminData = {
            ...req.body,
            isAdmin: true
        };
        const newAdmin = new User(adminData);
        await newAdmin.save();
        res.status(201).json({ message: 'Admin created successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error creating admin', error: error.message });
    }
};

export  { loginAdmin, createAdmin };




