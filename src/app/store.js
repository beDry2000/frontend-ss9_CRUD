import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import tutorialReducer from '../features/tutorial/tutorialSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        tutorial: tutorialReducer
    }
});

export default store;