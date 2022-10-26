import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser } from 'apps/users/models';

interface IState {
    authorized: boolean;
    currentUser: IUser | null
}

const initialState: IState = {
    authorized: false,
    currentUser: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthorized: (state, action: PayloadAction<IUser>) => {
            state.authorized = true;
            state.currentUser = action.payload;
        },
        clearAuthorized: (state) => {
            state.authorized = false;
            state.currentUser = null;
        },
    }
});

export const { setAuthorized, clearAuthorized } = authSlice.actions;
