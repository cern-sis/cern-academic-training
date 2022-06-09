
import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../../store'

interface User {
    username: string
}

interface LoginState {
  user: User | undefined
}

const initialState: LoginState = {
  user: undefined,
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login: (state, username) => {state.user = {username: username.payload}},
    logout: (state) => {state.user = undefined}
  },
})

export const { login, logout } = loginSlice.actions
export const currentUser = (state: RootState) => state.login.user
export default loginSlice.reducer
