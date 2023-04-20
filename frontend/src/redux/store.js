import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { timeBeeAPI } from '../api/API';
import signUpEmailAddress from './Slices/signUpEmailAdress';
import trackedTimeOwnReducer from './Slices/trackedTimeOwnSlice';
import clockReducer from "./Slices/clockSlice";
import userReducer from "./Slices/userSlice";

export const store = configureStore({
  reducer: {
    [timeBeeAPI.reducerPath]: timeBeeAPI.reducer,
    // ...add reducers for other APIs here, if any
    signupemail: signUpEmailAddress,
    trackedtime: trackedTimeOwnReducer,
    clock: clockReducer,
    user: userReducer
    //   //change view in the user profile
    //   profileview: profileViewSelector
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(timeBeeAPI.middleware),
});

setupListeners(store.dispatch);
