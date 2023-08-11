import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Response } from '@bam.tech/react-native-image-resizer';

export interface IShareSubmit {
  images: Response[];
  store: {
    id: string;
    name: string;
  } | null;
}

const initialState: IShareSubmit = {
  images: [],
  store: null
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
