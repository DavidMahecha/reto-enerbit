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
export const selectAuthState = (state: { reducer: typeof initialState }) => {
  console.log('?????', state)
  return state.reducer.authState
}
export default authSlice.reducer
