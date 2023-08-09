import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IShareSubmit {
  uris: string[];
  content: string;
}

const initialState: IShareSubmit = {
  uris: [],
  content: ''
};

const shareSubmitSlice = createSlice({
  name: 'share',
  initialState,
  reducers: {
    shareInfoSave: (state, action: PayloadAction<any>) => {
      state = { ...state, ...action.payload };

      return state;
    }
  }
});

export default shareSubmitSlice.reducer;
export const { shareInfoSave } = shareSubmitSlice.actions;
