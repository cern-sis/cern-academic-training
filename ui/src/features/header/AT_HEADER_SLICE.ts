import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../../store'

interface HeaderState {
  collapsed: boolean
}

const initialState: HeaderState = {
  collapsed: true,
}

export const headerSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.collapsed = !state.collapsed
    },
  },
})

export const { toggleMenu } = headerSlice.actions

export const menuState = (state: RootState) => state.header.collapsed

export default headerSlice.reducer
