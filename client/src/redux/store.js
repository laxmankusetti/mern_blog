import { configureStore } from '@reduxjs/toolkit';
import userReducer from './users/usersSlice.js';

export const store = configureStore({
    reducer : {
        user : userReducer,
    },
})