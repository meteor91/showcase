import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from 'apps/users/slices';
import { pageNameSlice } from './slices/pageName';

export const store = configureStore({
    reducer: {
        users: userSlice.reducer,
        pageName: pageNameSlice.reducer,
    },
});

export type TAppState = ReturnType<typeof store.getState>;
