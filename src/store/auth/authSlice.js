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
        }
    }
});

export const { cheking, onLogin } = authSlice.actions;