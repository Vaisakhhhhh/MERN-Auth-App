import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    loading: false,
    error: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = false;
        },
        signInFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateUserSuccess: (state, action) => {
            state.currentUser = {
                ...state.currentUser,
                ...action.payload,
            }
        },
        signOutUser: (state) => {
            state.currentUser = null;
        }
    }
});

export const { signInStart, signInSuccess, signInFailure, updateUserSuccess, signOutUser } = userSlice.actions;

export default userSlice.reducer;