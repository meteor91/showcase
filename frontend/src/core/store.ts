import { configureStore } from '@reduxjs/toolkit';
import { settingsSlice } from 'core/slices/settings';
import { authSlice } from 'core/auth/slices';
import {userSlice} from 'apps/users/slices';

export const store = configureStore({
    reducer: {
        users: userSlice.reducer,
        auth: authSlice.reducer,
        settings: settingsSlice.reducer,
    },
});

export type TAppState = ReturnType<typeof store.getState>;
