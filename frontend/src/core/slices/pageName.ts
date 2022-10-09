import { createSlice, SliceCaseReducers } from '@reduxjs/toolkit'
import { TLoadingStatus } from 'core/models';

interface IState {
    name?: string;
    status?: TLoadingStatus;
}

export const pageNameSlice = createSlice<IState, SliceCaseReducers<IState>>({
    name: 'pageName',
    initialState: {},
    reducers: {
        setPageName: (state, action) => {
            Object.assign(state, action.payload);
        },
        clearPageName: state => {
            state = {};
        }
    }
});

export const { setPageName, clearPageName } = pageNameSlice.actions;
