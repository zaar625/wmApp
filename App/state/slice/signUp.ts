import { createSlice, PayloadAction, configureStore } from '@reduxjs/toolkit';

export interface ISignUp {
  name: string;
  email: string;
  phone: string;
  password: string;
}

const initialState: ISignUp = {
  name: '',
  email: '',
  phone: '',
  password: ''
};

const signUpSlice = createSlice({
  name: 'signUp',
  initialState,
  reducers: {
    userInfo: (state, action: PayloadAction<any>) => {
      console.log('payload:', action.payload);
      console.log('state:', state);
      state = { ...state, ...action.payload };

      return state;
    }
  }
});

export default signUpSlice.reducer;
export const { userInfo } = signUpSlice.actions;
