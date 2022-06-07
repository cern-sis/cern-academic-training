import { configureStore } from '@reduxjs/toolkit';
import headerReducer from './features/header/AT_HEADER_SLICE';

export const store = configureStore({
  reducer: {
    header: headerReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
