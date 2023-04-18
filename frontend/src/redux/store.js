import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { timeBeeAPI } from '../api/API';
import { signUpEmailAddress } from './slices/signUpEmailAdress';

export const store = configureStore({
  reducer: {
    [timeBeeAPI.reducerPath]: timeBeeAPI.reducer,
    // ...add reducers for other APIs here, if any
    signupemail: signUpEmailAddress,

    //   //change view in the user profile
    //   profileview: profileViewSelector
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(timeBeeAPI.middleware),
});

setupListeners(store.dispatch);