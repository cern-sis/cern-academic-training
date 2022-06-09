import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query'

import headerReducer from './features/header/AT_HEADER_SLICE';
import searchReducer from './features/search-bar/search_slice';
import { lecturesApi } from './services/lectures.service';
import { lectureApi } from './services/lecture.service';
import loginReducer from './features/login/login_slice';

export const store = configureStore({
  reducer: {
    header: headerReducer,
    search: searchReducer,
    [lecturesApi.reducerPath]: lecturesApi.reducer,
    [lectureApi.reducerPath]: lectureApi.reducer,
    login: loginReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(lecturesApi.middleware, lectureApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
