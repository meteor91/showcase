import {createSlice, SliceCaseReducers} from '@reduxjs/toolkit'

interface IState {
    authorized: boolean;
}

export const authSlice = createSlice<IState, SliceCaseReducers<IState>>({
    name: 'auth',
    initialState: {
        authorized: false,
    },
    reducers: {
        setAuthorized: (state, action) => {
            state.authorized = action.payload;
        }
    }
});

export const { setAuthorized } = authSlice.actions;
