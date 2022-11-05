import {createSlice, PayloadAction, SliceCaseReducers} from '@reduxjs/toolkit'
import { ELoadingStatus } from 'core/models';

interface IState {
    locale: string;
    breadcrumbs: {
        [key: string]: {
            label: string | null,
            status: ELoadingStatus;
            link: string;
        }
    }

}

export const settingsSlice = createSlice<IState, SliceCaseReducers<IState>>({
    name: 'settings',
    initialState: {
        locale: 'EN',
        breadcrumbs: {},
    },
    reducers: {
        setLocale: (state, action) => {
            state.locale = action.payload;
        },
        setBreadcrumb: (
            state,
            action: PayloadAction<{
                name: string,
                label: string,
                link: string,
                status: ELoadingStatus,
            }>) => {
            const {name, label, status, link} = action.payload
            state.breadcrumbs[name] = {label, status, link};
        }
    }
});

export const { setLocale, setBreadcrumb } = settingsSlice.actions;
