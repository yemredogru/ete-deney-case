import { configureStore } from '@reduxjs/toolkit';
import authorization from './authorizationReducer';

export const store = configureStore({
  reducer: {
    auth: authorization
  },
})