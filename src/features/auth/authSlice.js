import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
    user: user ?? null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ''
}

// Register
export const register = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
    try {
        return await authService.register(userData);
    } catch (err) {
        const message = (err.response && err.response.data && err.response.data.message) ||
            err.message || err.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

// Login
export const login = createAsyncThunk('auth/login', async (userData, thunkAPI) => {
    try {
        return await authService.login(userData);
    } catch (err) {
        const message = (err.response && err.response.data && err.response.data.message) ||
            err.message || err.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

// Logout
export const logout = createAsyncThunk('auth/logout', async () => {
    return await authService.logout();
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state) => {
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state,action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(logout.fulfilled, state => {
                state.user = null;
            })
    }
})

export const { reset } = authSlice.actions;

export default authSlice.reducer;