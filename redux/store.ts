import { configureStore } from "@reduxjs/toolkit";
import usersReducer from './userSlice';
import companiesReducer from './companiesSlice';

export const store = configureStore({
    reducer: {
        users: usersReducer,
        companies: companiesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
