import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser : null,
    loading : false,
    error : null,
};

const usersSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {
        signInStart : (state) => {
            state.loading = true;
            state.error = null;
        },
        signInSuccess : (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
            state.error = null;
        },
        signInFailure : (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateStart : (state) => {
            state.loading = true;
            state.error = null;
        },
        updateFailure : (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateSuccess : (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
            state.error = null
        }
    }
})

export const { signInStart, signInSuccess, signInFailure, updateStart, updateSuccess, updateFailure } = usersSlice.actions;
export default usersSlice.reducer;