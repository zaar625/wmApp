import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IShareSubmit {
  uri: string[];
  content: string;
}

const initialState: IShareSubmit = {
  uri: [],
  content: ''
};

const shareSubmitSlice = createSlice({
  name: 'share',
  initialState,
  reducers: {
    shareInfoSave: (state, action: PayloadAction<any>) => {
      console.log(action.payload);
      state.uri = action.payload;
    }
  }
});

export default shareSubmitSlice.reducer;
export const { shareInfoSave } = shareSubmitSlice.actions;
