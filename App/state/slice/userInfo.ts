import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IUser {
  storeList: null | string[];
}

const initialState: IUser = {
  storeList: null
};

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    addUserStoreList: (state, action: PayloadAction<any>) => {
      state = { ...state, ...action.payload };

      return state;
    }
  }
});
//userSaveInfo
export default userInfoSlice.reducer;
export const { addUserStoreList } = userInfoSlice.actions;
