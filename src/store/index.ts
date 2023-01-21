import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'

const store = configureStore({
    reducer: {
      [authSlice.name]: authSlice
    },
    devTools: true
  })

export default store
