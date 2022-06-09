import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../../store'

interface SearchState {
  searchTerm: string | undefined
}

const initialState: SearchState = {
  searchTerm: undefined,
}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchTerm: (state, term) => {state.searchTerm = term.payload},
    clearSearchTerm: (state) => {state.searchTerm = undefined}
  },
})

export const { setSearchTerm, clearSearchTerm } = searchSlice.actions
export const searchState = (state: RootState) => state.search.searchTerm
export default searchSlice.reducer
