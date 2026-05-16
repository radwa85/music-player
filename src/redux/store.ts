import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/authSlice';
import searchReducer from '../store/slices/searchSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;