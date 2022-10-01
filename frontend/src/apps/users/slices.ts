import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'users',
    initialState: {
        currentUser: null,
    },
    reducers: {
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload;
        },
        clearCurrentUser: state => {
            state.currentUser = null;
        }
    }
});

export const { setCurrentUser, clearCurrentUser } = userSlice.actions;
