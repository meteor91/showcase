import { configureStore } from '@reduxjs/toolkit';
import { settingsSlice } from 'core/slices/settings';
import { userSlice } from 'apps/users/slices';

export const store = configureStore({
    reducer: {
        users: userSlice.reducer,
        settings: settingsSlice.reducer,
    },
});

export type TAppState = ReturnType<typeof store.getState>;
