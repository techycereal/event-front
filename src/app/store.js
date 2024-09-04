import { configureStore } from '@reduxjs/toolkit';
import authState from '../features/authSlice/authSlice';

export const store = configureStore({
  reducer: {
    auth: authState,
  },
});
