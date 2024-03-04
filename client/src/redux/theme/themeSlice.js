import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    theme : 'dark'
}

const themeSlice = createSlice({
    name : 'theme',
    initialState,
    reducers : {
        themeToggle : (state) => {
            state.theme = state.theme === 'dark' ? 'light' : 'dark'
        }
    }
})

export const { themeToggle } = themeSlice.actions;
export default themeSlice.reducer;