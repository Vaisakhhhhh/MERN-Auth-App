import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentAdmin: null,
    loading: false,
    error: false,
};

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
        },
        loginSuccess: (state, action) => {
            state.currentAdmin = action.payload;
            state.loading = false;
            state.error = false;
        },
        loginFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        logoutUser: (state) => {
            state.currentAdmin = null;
        },
        clearError: (state) => {
            state.error = null
        },
    }
});

export const { loginStart, loginSuccess, loginFailure, logoutUser, clearError } = adminSlice.actions;
export default adminSlice.reducer;