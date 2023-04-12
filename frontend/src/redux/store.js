import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
    reducer: {
    //   [lunaAPI.reducerPath]: lunaAPI.reducer,
    //   // ...add reducers for other APIs here, if any

    //   //change view in the user profile
    //   profileview: profileViewSelector
    },
    // middleware: (getDefaultMiddleware) =>
    //   getDefaultMiddleware().concat(lunaAPI.middleware),
  });

  setupListeners(store.dispatch);