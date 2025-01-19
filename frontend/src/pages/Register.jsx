import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../store/slices/userSlice';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.user);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(registerUser(formData)).unwrap();
            navigate('/');
        } catch (err) {
            console.error('Registration failed:', err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
            {error && <div className="error">{error}</div>}
            <input
                type="text"
                placeholder="Name"
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <input
                type="email"
                placeholder="Email"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <input
                type="password"
                placeholder="Password"
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <button type="submit" disabled={loading}>
                {loading ? 'Loading...' : 'Register'}
            </button>
        </form>
    );
};

export default Register;