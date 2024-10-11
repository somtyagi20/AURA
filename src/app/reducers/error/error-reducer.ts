import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface IErrorSlice {
  internet: boolean;
  serverError: boolean;
}

const initialState: IErrorSlice = {
  internet: true,
  serverError: false,
};

const errorSlice = createSlice({
  name: 'Errors',
  initialState,
  reducers: {
    updateNetStatus(state, action: PayloadAction<boolean>) {
      state.internet = action.payload;
    },
    updateServerErrorStatus(state, action: PayloadAction<boolean>) {
      state.serverError = action.payload;
    },
  },
});

export const {updateNetStatus, updateServerErrorStatus} = errorSlice.actions;

export default errorSlice.reducer;
