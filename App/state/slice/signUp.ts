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

const signUpSlice = createSlice({
  name: 'signUp',
  initialState,
  reducers: {
    signUpUserInfo: (state, action: PayloadAction<any>) => {
      state = { ...state, ...action.payload };

      return state;
    }
  }
});
//userSaveInfo
export default signUpSlice.reducer;
export const { signUpUserInfo } = signUpSlice.actions;
