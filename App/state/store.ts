import { configureStore } from '@reduxjs/toolkit';

import signUpReducer from './slice/signUp';
import modalReducer from './slice/modal';
import bottomSheetReducer from './slice/bottomSheet';
import ShareReducer from './slice/share';
import userInfoReducer from './slice/userInfo';
import toastReducer from './slice/toast';

export const store = configureStore({
  reducer: {
    signUp: signUpReducer,
    modal: modalReducer,
    bottomSheet: bottomSheetReducer,
    share: ShareReducer,
    userInfo: userInfoReducer,
    toast: toastReducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
  // 기본 값이 true지만 배포할때 코드를 숨기기 위해서 false로 변환하기 쉽게 설정에 넣어놨다.
  devTools: true
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
