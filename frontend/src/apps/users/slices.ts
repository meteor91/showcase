import { createSlice } from '@reduxjs/toolkit'
import { IUser } from './models';

interface IState {
    currentUser: IUser | null;
}

const initialState: IState = {
    currentUser: null,
}

export const userSlice = createSlice({
    name: 'users',
    initialState,
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
