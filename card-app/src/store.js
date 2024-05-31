import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { cardApi } from './services/cards'
import userReducer from './userSlice'


export const store = configureStore({
  reducer: {
    [cardApi.reducerPath]: cardApi.reducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cardApi.middleware),
})

setupListeners(store.dispatch)