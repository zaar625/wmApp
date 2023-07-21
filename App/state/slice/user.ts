import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IUser {
  name: string;
  email: string;
  phone: string;
  password: string;
}

const initialState: IUser = {
  name: '',
  email: '',
  phone: '',
  password: ''
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userSaveInfo: (state, action: PayloadAction<any>) => {
      console.log('payload:', action.payload);
      state = { ...state, ...action.payload };
      console.log('state:', state);

      return state;
    }
  }
});

export default userSlice.reducer;
export const { userSaveInfo } = userSlice.actions;
