import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IShareSubmit {
  uri: string[];
}

const initialState: IShareSubmit = {
  uri: []
};

const shareSubmitSlice = createSlice({
  name: 'share',
  initialState,
  reducers: {
    shareInfoSave: (state, action: PayloadAction<any>) => {
      state.uri = action.payload;
    }
  }
});

export default shareSubmitSlice.reducer;
export const { shareInfoSave } = shareSubmitSlice.actions;
