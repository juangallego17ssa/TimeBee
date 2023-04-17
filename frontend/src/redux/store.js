import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { timeBeeAPI } from '../api/API'
import profileViewSelector from './Slices/profileViewSelector';

export const store = configureStore({
  reducer: {
    [timeBeeAPI.reducerPath]: timeBeeAPI.reducer,
    // ...add reducers for other APIs here, if any

    //change view in the user profile
    profileview: profileViewSelector
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(timeBeeAPI.middleware),
});

setupListeners(store.dispatch);