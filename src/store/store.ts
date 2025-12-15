import { configureStore } from '@reduxjs/toolkit';
import productSliceReducer from '../slices/product.slice';

export const store = configureStore({
  reducer: productSliceReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
