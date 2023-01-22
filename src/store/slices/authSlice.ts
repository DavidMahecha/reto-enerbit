import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  authState: false
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthState (state, action) {
      state.authState = action.payload
    }
  }
})

export const { setAuthState } = authSlice.actions

export const selectAuthState = (state: { authState: typeof initialState }) => { 
  return state.authState
}
export default authSlice.reducer