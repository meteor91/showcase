import { createSlice, SliceCaseReducers } from '@reduxjs/toolkit'
import { ELoadingStatus } from 'core/models';

interface IState {
    locale: string;
    pageName: {
        name?: string | null;
        status: ELoadingStatus;
    }

}

export const settingsSlice = createSlice<IState, SliceCaseReducers<IState>>({
    name: 'settings',
    initialState: {
        locale: 'EN',
        pageName: {
            status: ELoadingStatus.Idle
        }
    },
    reducers: {
        setLocale: (state, action) => {
            state.locale = action.payload;
        },
        setPageName: (state, action) => {
            state.pageName = action.payload;
        },
        clearPageName: state => {
            state.pageName.name = null;
            state.pageName.status = ELoadingStatus.Idle;
        }
    }
});

export const { setLocale, setPageName, clearPageName } = settingsSlice.actions;
