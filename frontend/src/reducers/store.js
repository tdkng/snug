import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './authReducer';

const user = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : null;

const initialState = {
    auth: { user: user }
};

export const Store = configureStore({
    reducer: {
        auth: authReducer
    },
    preloadedState: initialState
});

export default Store;
