import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/counter/userSlice';
import appReducer from '../features/counter/appSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    app: appReducer,
  },
});
