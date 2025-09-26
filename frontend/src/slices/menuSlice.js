import { createSlice } from '@reduxjs/toolkit'

export const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    showMenu: false,
    inputValue: ""
  },
  reducers: {
    openMenu: (state) => {
      state.showMenu = true;
    },
    closeMenu: (state) => {
      state.showMenu = false;
    },
    setInputValue: (state, action) => {
      state.inputValue = action.payload
    }
  },
})

export const { openMenu, closeMenu, setInputValue } = menuSlice.actions

export default menuSlice.reducer