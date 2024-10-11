import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './reducers/login/login-reducer';
import errorReducer from './reducers/error/error-reducer';

export const store = configureStore({
    reducer: {
        login: loginReducer,
        error: errorReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({serializableCheck: false}),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
