import { createSlice } from "@reduxjs/toolkit";


export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking', // checking, authenticated, not-authenticated
        user: {},
        errorMessage: undefined,
    },
    reducers: {
        onCheking: (state) => {
            state.status = 'checking';
            state.user = {};
            state.errorMessage = undefined;
        },
        onLogin: (state, action) => {
            state.status = 'authenticated';
            state.user = action.payload;
            state.errorMessage = undefined;
        },
        onLogout: (state, action) => {
            state.status = 'not-authenticated';
            state.user = {};
            state.errorMessage = action.payload;
        },
        clearErrorMessages: (state) => {
            state.errorMessage = undefined;
        }
    }
});

export const { onCheking, onLogin, onLogout, clearErrorMessages } = authSlice.actions;