import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from 'apps/users/slices';

export const store = configureStore({
    reducer: {
        users: userSlice.reducer,
    }
});

export type TAppState = ReturnType<typeof store.getState>;
