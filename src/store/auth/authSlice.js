import { createSlice } from "@reduxjs/toolkit";


export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking', // checking, authenticated, not-authenticated
        user: {},
        errorMessages: undefined,
    },
    reducers: {
        onCheking: (state) => {
            state.status = 'checking';
            state.user = {};
            state.errorMessages = undefined;
        },
        onLogin: (state, action) => {
            state.status = 'authenticated';
            state.user = action.payload;
            state.errorMessages = undefined;
        },
        onLogout: (state, action) => {
            state.status = 'not-authenticated';
            state.user = {};
            state.errorMessages = action.payload;
        },
        clearErrorMessages: (state) => {
            state.errorMessages = undefined;
        }
    }
});

export const { onCheking, onLogin, onLogout, clearErrorMessages } = authSlice.actions;