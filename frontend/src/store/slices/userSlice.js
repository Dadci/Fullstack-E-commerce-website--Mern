import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/admins/login';

// Async thunk for admin login
export const loginAdmin = createAsyncThunk(
    'admin/login',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}`, { email, password });
            localStorage.setItem('admin', JSON.stringify(response.data.admin));
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Initial state
const initialState = {
    admin: localStorage.getItem('admin') ? JSON.parse(localStorage.getItem('admin')) : null,
    loading: false,
    error: null,
    success: false
};

const userSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem('admin');
            state.admin = null;
            state.loading = false;
            state.error = null;
            state.success = false;
        },
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAdmin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginAdmin.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.admin = action.payload.admin;
                state.error = null;
            })
            .addCase(loginAdmin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            });
    }
});

export const { logout, clearError } = userSlice.actions;
export default userSlice.reducer;
