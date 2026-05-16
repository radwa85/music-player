import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './slices/searchSlice';
import authReducer from '../redux/authSlice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
