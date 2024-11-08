import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Config from 'react-native-config';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IUser {
    id: string;
    phone_number: string;
    name: string;
}

export interface ILoginState {
    status: 'logout' | 'authenticating' | 'loggedIn' | 'forceUpdate';
    token: string | undefined;
    completeSteps: boolean;
    user: IUser | null;
}

const initialState: ILoginState = {
    status: 'authenticating',
    token: undefined,
    completeSteps: false,
    user: null,
  };

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        authenticating(state) {
            state.status = 'authenticating';
          },
        login(state, action: PayloadAction<{token: string; user: IUser}>) {
            AsyncStorage.setItem(
                `${Config.REACT_APP_SECRET_KEY}`,
                action.payload.token,
            );
            state.status = 'loggedIn';
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.completeSteps = true;
        },
        logout(state) {
            state.status = 'logout';
            state.token = undefined;
            state.user = null;
            AsyncStorage.removeItem(`${Config.REACT_APP_SECRET_KEY}`);
        },
        setToken(state, action: PayloadAction<string>) {
            AsyncStorage.setItem(`${Config.REACT_APP_SECRET_KEY}`, action.payload);
            state.token = action.payload;
        },
        forceUpdate(state) {
            state.status = 'forceUpdate';
            state.token = undefined;
        },
        updateUser(state, action: PayloadAction<IUser>) {
            state.user = action.payload;
        },
    },
});

export const { authenticating, login, logout, setToken, forceUpdate, updateUser } = loginSlice.actions;
export default loginSlice.reducer;
